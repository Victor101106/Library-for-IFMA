import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidRegistrationError } from './errors'

export namespace Registration {
    export type Request = string | undefined
    export type DTO = string | undefined
    export type Response = Registration
}

export class Registration {

    private constructor (
        private registration?: string
    ) {}

    public static create(registration: Registration.Request): Result<InvalidRegistrationError, Registration.Response> {
        
        const isInvalidRegistration = registration && !Registration.validate(registration)

        if (isInvalidRegistration)
            return failure(new InvalidRegistrationError(registration))
        
        return success(new Registration(registration))

    }

    public static with(registration: Registration.DTO): Registration.Response {
        return new Registration(registration)
    }

    public static validate(registration: string): boolean {
        return z.string().length(16).safeParse(registration).success
    }

    public update(registration: string): Result<InvalidRegistrationError, string> {
        
        if (!Registration.validate(registration))
            return failure(new InvalidRegistrationError(registration))

        return success(this.registration = registration)

    }

    public get value(): string | undefined {
        return this.registration
    }

}