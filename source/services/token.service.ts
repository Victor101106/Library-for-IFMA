import { environment } from '@configs'
import { failure, Result, success } from '@helpers'
import { payloadSchema } from '@schemas/services/token'
import { sign, verify } from 'jsonwebtoken'
import { InvalidAccessTokenError } from './errors'

export namespace TokenService {

    export namespace CreateAccessToken {
        export type Request = string
        export type Response = string
    }

    export namespace ReceiveUserIdFromAccessToken {
        export type Request = string
        export type Response = string
    }

}

export class TokenService {

    private constructor () {}

    public static create(): TokenService {
        return new TokenService()
    }

    async createAccessToken(userId: TokenService.CreateAccessToken.Request): Promise<TokenService.CreateAccessToken.Response> {
        return sign({ sub: userId }, environment.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '30d' })
    }

    async receiveUserIdFromAccessToken(accessToken: TokenService.ReceiveUserIdFromAccessToken.Request): Promise<Result<InvalidAccessTokenError, TokenService.ReceiveUserIdFromAccessToken.Response>> {
        try {
            
            const payload = verify(accessToken, environment.ACCESS_TOKEN_SECRET_KEY)

            const { sub } = payloadSchema.validate(payload)

            return success(sub)

        } catch {
            return failure(new InvalidAccessTokenError())
        }
    }

}

export const tokenService = TokenService.create()