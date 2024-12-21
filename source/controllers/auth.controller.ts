import { ACCESS_TOKEN_COOKIE, badRequest, ok, serializeCookie } from '@helpers'
import { AuthenticateWithGoogleCallbackRequest, AuthenticateWithGoogleRequest, CompleteSignUpRequest } from '@schemas/controllers'
import { authService, AuthService, tokenService, TokenService, userService, UserService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'
import { TokenPayload } from 'google-auth-library'

export class AuthController {

    private constructor (
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    public static create(authService: AuthService, tokenService: TokenService, userService: UserService): AuthController {
        return new AuthController(authService, tokenService, userService)
    }

    public async completeSignUpHandler(request: FastifyRequest<CompleteSignUpRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const completedSignUp = await userService.completeSignUp({ 
            ...request.body,
            userId: String(request.locals.userId)
        })

        if (completedSignUp.failed())
            return badRequest(reply, completedSignUp.value)

        const user = completedSignUp.value

        return ok(reply, {
            registration: user.registration.to(),
            siape: user.siape.to(),
            role: user.role.to()
        })

    }

    public async logoutHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        reply.header('set-cookie', serializeCookie(ACCESS_TOKEN_COOKIE, ''))

        return ok(reply)

    }

    public async redirectToGoogleAuthorizeURLHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        const redirectURL = authService.generateGoogleAuthorizeURL()

        return reply.redirect(redirectURL)

    }

    public async authenticateWithGoogleCallbackHandler(request: FastifyRequest<AuthenticateWithGoogleCallbackRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const verificationResult = await this.authService.verifyGoogleCode(request.query.code)

        if (verificationResult.failed())
            return badRequest(reply, verificationResult.value)

        const payload = verificationResult.value

        return this.authenticateWithGoogleCommonHandler(payload, reply)

    }

    public async authenticateWithGoogleHandler(request: FastifyRequest<AuthenticateWithGoogleRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const verificationResult = await this.authService.verifyGoogleCredential(request.body.credential)

        if (verificationResult.failed())
            return badRequest(reply, verificationResult.value)

        const payload = verificationResult.value

        return this.authenticateWithGoogleCommonHandler(payload, reply)

    }

    private async authenticateWithGoogleCommonHandler(payload: TokenPayload, reply: FastifyReply): Promise<FastifyReply> {
        
        const userOrError = await this.userService.findByGoogleIdOrCreateUser({
            googleId: payload.sub,
            picture: payload.picture,
            email: payload.email,
            name: payload.name
        })

        if (userOrError.failed())
            return badRequest(reply, userOrError.value)

        const user = userOrError.value

        const accessToken = await this.tokenService.signAccessToken(user.id.value)

        reply.header('set-cookie', serializeCookie(ACCESS_TOKEN_COOKIE, accessToken))
        
        return ok(reply, {
            user: {
                picture: user.picture.to(),
                email: user.email.to(),
                name: user.name.to(),
                id: user.id.to()
            }
        })

    }

}

export const authController = AuthController.create(authService, tokenService, userService)