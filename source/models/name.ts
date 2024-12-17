import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidNameError } from './errors'

export namespace Name {
    export type Request = string
    export type DTO = string
    export type Response = Name
}

export class Name {

    private constructor (
        private name: string
    ) {}

    public static create(name: Name.Request): Result<InvalidNameError, Name.Response> {
        
        const isInvalidName = !Name.validate(name)

        if (isInvalidName)
            return failure(new InvalidNameError(name))
        
        return success(new Name(name))

    }

    public static with(name: Name.DTO): Name.Response {
        return new Name(name)
    }

    public static validate(name: string): boolean {
        return z.string().min(2).safeParse(name).success
    }

    public update(name: string): Result<InvalidNameError, string> {

        if (!Name.validate(name))
            return failure(new InvalidNameError(name))

        return success(this.name = name)

    }

    public get value(): string {
        return this.name
    }

}