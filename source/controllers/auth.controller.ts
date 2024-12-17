import { cookieHelper } from '@helpers'
import { RoleEnum, User } from '@models'
import { callbackRequestSchema } from '@schemas/controllers/auth'
import { authService, AuthService, tokenService, TokenService, userService, UserService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class AuthController {

    private constructor (
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {}

    public static create(authService: AuthService, tokenService: TokenService, userService: UserService): AuthController {
        return new AuthController(authService, tokenService, userService)
    }

    async logoutHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        reply.header('set-cookie', cookieHelper.createAccessTokenCookie(''))
        reply.redirect('/')

        return reply
        
    }

    async callbackHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = callbackRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return reply.redirect('/')

        const { credential } = validationResult.value.body

        const verificationResult = await this.authService.verifyCredential(credential)

        if (verificationResult.failed())
            return reply.redirect('/')

        const payload = verificationResult.value

        const findResult = await this.userService.findUserByGoogleId(payload.sub)

        let user: User

        if (findResult.successfully()) {
            
            user = findResult.value

        } else {
            
            const creationResult = await this.userService.createUser({
                picture: String(payload.picture),
                googleId: String(payload.sub),
                email: String(payload.email),
                name: String(payload.name),
                role: RoleEnum.Pending
            })
    
            if (creationResult.failed())
                return reply.redirect('/')
    
            user = creationResult.value

        }

        const accessToken = await this.tokenService.createAccessToken(user.id.value)

        reply.header('set-cookie', cookieHelper.createAccessTokenCookie(accessToken))
        
        return reply.redirect('/profile')

    }

}

export const authController = AuthController.create(authService, tokenService, userService)