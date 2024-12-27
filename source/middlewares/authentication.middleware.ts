import { ACCESS_TOKEN_COOKIE, unauthorized } from '@helpers'
import { tokenService, TokenService, userService, UserService } from '@services'
import { parse as parseCookie } from 'cookie'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AccessTokenMissingError } from './errors'

export class AuthMiddleware {

    private constructor (
        private readonly tokenService: TokenService,
        private readonly userService: UserService
    ) {
        this.ensureAuthenticationHandler = this.ensureAuthenticationHandler.bind(this)
    }

    public static create(tokenService: TokenService, userService: UserService): AuthMiddleware {
        return new AuthMiddleware(tokenService, userService)
    }

    public async ensureAuthenticationHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply | void> {

        if (!request.headers.cookie)
            return unauthorized(reply, new AccessTokenMissingError())
        
        const cookie = parseCookie(request.headers.cookie)

        const accessToken = cookie[ACCESS_TOKEN_COOKIE.name]

        if (!accessToken)
            return unauthorized(reply, new AccessTokenMissingError())

        const verifyResult = await this.tokenService.verifyAccessToken(accessToken)

        if (verifyResult.failed())
            return unauthorized(reply, verifyResult.value)

        const userId = verifyResult.value

        const findResult = await this.userService.findUserById(userId)

        if (findResult.failed())
            return unauthorized(reply, findResult.value)

        const user = findResult.value

        request.authentication = { user, userId }

    }

}

export const authMiddleware = AuthMiddleware.create(
    tokenService,
    userService
)