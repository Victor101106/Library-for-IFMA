import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidCodeError } from './errors'

export namespace Code {
    export type Request = number
    export type DTO = number
    export type Response = Code
}

export class Code {

    private constructor (
        public readonly value: number
    ) {}

    public static create(code: Code.Request): Result<InvalidCodeError, Code.Response> {
        
        const isInvalidCode = !Code.validate(code)

        if (isInvalidCode)
            return failure(new InvalidCodeError(code))
        
        return success(new Code(code))

    }

    public static with(code: Code.DTO): Code.Response {
        return new Code(code)
    }

    public static validate(code: number): boolean {
        return z.number().int().positive().safeParse(code).success
    }

    public to(): Code.DTO {
        return this.value
    }

}