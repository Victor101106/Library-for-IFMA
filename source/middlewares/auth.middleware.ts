import { cookieHelper } from '@helpers'
import { denyAuthenticationRequestSchema, ensureAuthenticationRequestSchema } from '@schemas/middlewares/auth'
import { tokenService, TokenService } from '@services'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export class AuthMiddleware {

    private constructor (
        private readonly tokenService: TokenService,
    ) {}

    public static create(tokenService: TokenService): AuthMiddleware {
        return new AuthMiddleware(tokenService)
    }

    async denyAuthenticationHandle(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): Promise<FastifyReply | void> {

        const validationResult = denyAuthenticationRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return done()

        const { cookie: cookieHeader } = validationResult.value.headers

        if (!cookieHeader)
            return done()

        const cookies = cookieHelper.parse(cookieHeader)

        const accessToken = cookies['access-token']

        if (!accessToken)
            return done()
        
        return reply.redirect('/profile')

    }

    async ensureAuthenticationHandle(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): Promise<FastifyReply | void> {

        const validationResult = ensureAuthenticationRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return reply.redirect('/logout')

        const { cookie: cookieHeader } = validationResult.value.headers

        const cookies = cookieHelper.parse(cookieHeader)

        const accessToken = cookies['access-token']

        if (!accessToken)
            return reply.redirect('/logout')

        const receiptResult = await this.tokenService.receiveUserIdFromAccessToken(accessToken)

        if (receiptResult.failed())
            return reply.redirect('/logout')

        const userId = receiptResult.value

        request.locals = { userId }

        return done()

    }

}

export const authMiddleware = AuthMiddleware.create(tokenService)