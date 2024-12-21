import { ACCESS_TOKEN_COOKIE, unauthorized } from '@helpers'
import { ensureAuthenticationRequestSchema } from '@schemas/middlewares/auth'
import { tokenService, TokenService } from '@services'
import { parse as parseCookie } from 'cookie'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AccessTokenMissingError } from './errors'

export class AuthMiddleware {

    private constructor (private readonly tokenService: TokenService) {
        this.ensureAuthenticationHandle = this.ensureAuthenticationHandle.bind(this)
    }

    public static create(tokenService: TokenService): AuthMiddleware {
        return new AuthMiddleware(tokenService)
    }

    public async ensureAuthenticationHandle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> {

        const validationResult = ensureAuthenticationRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return unauthorized(reply, validationResult.value)

        const { cookie: cookieHeader } = validationResult.value.headers

        const cookie = parseCookie(cookieHeader)

        const accessToken = cookie[ACCESS_TOKEN_COOKIE.name]

        if (!accessToken)
            return unauthorized(reply, new AccessTokenMissingError())

        const receiptResult = await this.tokenService.verifyAccessToken(accessToken)

        if (receiptResult.failed())
            return unauthorized(reply, receiptResult.value)

        const userId = receiptResult.value

        request.locals = { userId }

    }

}

export const authMiddleware = AuthMiddleware.create(tokenService)