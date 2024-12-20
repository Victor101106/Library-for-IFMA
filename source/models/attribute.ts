import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidAttributeError } from './errors'

export namespace Attribute {
    export type Request = string
    export type DTO = string
    export type Response = Attribute
}

export class Attribute {

    private constructor (
        private attribute: string
    ) {}

    public static create(attribute: Attribute.Request): Result<InvalidAttributeError, Attribute.Response> {
        
        const isInvalidAttribute = !Attribute.validate(attribute)

        if (isInvalidAttribute)
            return failure(new InvalidAttributeError(attribute))
        
        return success(new Attribute(attribute))

    }

    public static with(attribute: Attribute.DTO): Attribute.Response {
        return new Attribute(attribute)
    }

    public static validate(attribute: string): boolean {
        return z.string().min(2).safeParse(attribute).success
    }

    public update(attribute: string): Result<InvalidAttributeError, string> {

        if (!Attribute.validate(attribute))
            return failure(new InvalidAttributeError(attribute))

        return success(this.attribute = attribute)

    }

    public get value(): string {
        return this.attribute
    }

    public to(): Attribute.DTO {
        return this.value
    }

}