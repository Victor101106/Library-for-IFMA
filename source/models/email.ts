import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidEmailError } from './errors'

export namespace Email {
    export type Request = string
    export type DTO = string
    export type Response = Email
}

export class Email {

    private constructor (
        public readonly value: string
    ) {}

    public static create(email: Email.Request): Result<InvalidEmailError, Email.Response> {
        
        const isInvalidEmail = !Email.validate(email)

        if (isInvalidEmail)
            return failure(new InvalidEmailError(email))
        
        return success(new Email(email))

    }

    public static with(email: Email.DTO): Email.Response {
        return new Email(email)
    }

    public static validate(email: string): boolean {
        return z.string().email().safeParse(email).success
    }

}