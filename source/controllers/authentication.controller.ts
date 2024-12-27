import { ACCESS_TOKEN_COOKIE, badRequest, ok, serializeCookie } from '@helpers'
import { CompleteSignUpRequest, LogInWithGoogleCallbackRequest, LogInWithGoogleRequest } from '@schemas'
import { authenticationService, AuthenticationService, tokenService, TokenService, userService, UserService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { TokenPayload } from 'google-auth-library'

export class AuthenticationController {

    private constructor (
        private readonly authenticationService: AuthenticationService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    public static create(authenticationService: AuthenticationService, tokenService: TokenService, userService: UserService): AuthenticationController {
        return new AuthenticationController(authenticationService, tokenService, userService)
    }

    public async redirectToGoogleAuthorizeURLHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        const redirectURL = authenticationService.generateGoogleAuthorizeURL()

        return reply.redirect(redirectURL)

    }

    public async logInWithGoogleCallbackHandler(request: FastifyRequest<LogInWithGoogleCallbackRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const verifyResult = await this.authenticationService.verifyGoogleCode(request.query.code)

        if (verifyResult.failed())
            return badRequest(reply, verifyResult.value)

        const payload = verifyResult.value

        return this.logInWithGoogleCommonHandler(payload, reply)

    }

    public async logInWithGoogleHandler(request: FastifyRequest<LogInWithGoogleRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const verifyResult = await this.authenticationService.verifyGoogleCredential(request.body.credential)

        if (verifyResult.failed())
            return badRequest(reply, verifyResult.value)

        const payload = verifyResult.value

        return this.logInWithGoogleCommonHandler(payload, reply)

    }

    private async logInWithGoogleCommonHandler(payload: TokenPayload, reply: FastifyReply): Promise<FastifyReply> {
        
        const result = await this.userService.findByOAuthIdOrCreateUser({
            oAuthId: payload.sub,
            picture: payload.picture,
            email: payload.email,
            name: payload.name
        })

        if (result.failed())
            return badRequest(reply, result.value)

        const user = result.value

        const accessToken = await this.tokenService.signAccessToken(user.id.value)

        reply.header('set-cookie', serializeCookie(ACCESS_TOKEN_COOKIE, accessToken))
        
        return ok(reply, user.to())

    }

    public async completeSignUpHandler(request: FastifyRequest<CompleteSignUpRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const assignResult = await userService.assignRoleToUser({...request.body, ...request.authentication})

        if (assignResult.failed())
            return badRequest(reply, assignResult.value)

        const assignedUser = assignResult.value

        return ok(reply, {
            registration: assignedUser.registration.to(),
            siape: assignedUser.siape.to(),
            role: assignedUser.role.to()
        })

    }

    public async logoutHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        reply.header('set-cookie', serializeCookie(ACCESS_TOKEN_COOKIE, ''))

        return ok(reply)

    }

}

export const authenticationController = AuthenticationController.create(authenticationService, tokenService, userService)