import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidGoogleIdError } from './errors'

export namespace GoogleId {
    export type Request = string
    export type DTO = string
    export type Response = GoogleId
}

export class GoogleId {

    private constructor (
        public readonly value: string
    ) {}

    public static create(googleid: GoogleId.Request): Result<InvalidGoogleIdError, GoogleId.Response> {
        
        const isInvalidGoogleId = !GoogleId.validate(googleid)

        if (isInvalidGoogleId)
            return failure(new InvalidGoogleIdError())
        
        return success(new GoogleId(googleid))

    }

    public static with(googleid: GoogleId.DTO): GoogleId.Response {
        return new GoogleId(googleid)
    }

    public static validate(googleid: string): boolean {
        return z.string().min(1).safeParse(googleid).success
    }

}