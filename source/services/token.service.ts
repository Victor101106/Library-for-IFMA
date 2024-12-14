import { environment } from '@configs'
import { failure, Result, success } from '@helpers'
import { UserModel } from '@models'
import { payloadSchema } from '@schemas/services/token'
import { sign, verify } from 'jsonwebtoken'
import { InvalidAccessTokenError } from './errors'

export namespace TokenService {

    export namespace CreateAccessToken {
        export type Request = UserModel
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

    async createAccessToken(request: TokenService.CreateAccessToken.Request): Promise<TokenService.CreateAccessToken.Response> {
        return sign({ userId: request.id }, environment.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '30d' })
    }

    async receiveUserIdFromAccessToken(request: TokenService.ReceiveUserIdFromAccessToken.Request): Promise<Result<InvalidAccessTokenError, TokenService.ReceiveUserIdFromAccessToken.Response>> {
        try {
            
            const payload = verify(request, environment.ACCESS_TOKEN_SECRET_KEY)

            const { userId } = payloadSchema.validate(payload)

            return success(userId)

        } catch {
            return failure(new InvalidAccessTokenError())
        }
    }

}

export const tokenService = TokenService.create()