import { failure, Result, success } from '@helpers'
import { accessTokenPayloadSchema } from '@schemas/services/token'
import { sign, verify } from 'jsonwebtoken'
import { InvalidAccessTokenError } from './errors'

export namespace TokenService {

    export namespace SignAccessToken {
        export type Request = string
        export type Response = string
    }

    export namespace VerifyAccessToken {
        export type Request = string
        export type Response = string
    }

}

export class TokenService {

    private constructor () {}

    public static create(): TokenService {
        return new TokenService()
    }

    public async signAccessToken(userId: TokenService.SignAccessToken.Request): Promise<TokenService.SignAccessToken.Response> {

        const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY
        
        const payload = {
            sub: userId
        }

        return sign(payload, secretKey, { expiresIn: '30d' })

    }

    public async verifyAccessToken(accessToken: TokenService.VerifyAccessToken.Request): Promise<Result<InvalidAccessTokenError, TokenService.VerifyAccessToken.Response>> {
        
        try {
            
            const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY

            const payload = verify(accessToken, secretKey)

            const { sub } = accessTokenPayloadSchema.validate(payload)

            return success(sub)

        } catch {
            return failure(new InvalidAccessTokenError())
        }

    }

}

export const tokenService = TokenService.create()