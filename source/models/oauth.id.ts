import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidOAuthIdError } from './errors'

export namespace OAuthId {
    export type Request = string
    export type DTO = string
    export type Response = OAuthId
}

export class OAuthId {

    private constructor (
        public readonly value: string
    ) {}

    public static create(oauthid: OAuthId.Request): Result<InvalidOAuthIdError, OAuthId.Response> {
        
        const isInvalidOAuthId = !OAuthId.validate(oauthid)

        if (isInvalidOAuthId)
            return failure(new InvalidOAuthIdError())
        
        return success(new OAuthId(oauthid))

    }

    public static with(oauthid: OAuthId.DTO): OAuthId.Response {
        return new OAuthId(oauthid)
    }

    public static validate(oauthid: string): boolean {
        return z.string().min(1).safeParse(oauthid).success
    }

    public to(): OAuthId.DTO {
        return this.value
    }

}