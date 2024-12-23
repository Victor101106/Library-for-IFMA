import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidISBNError } from './errors'

export namespace ISBN {
    export type Request = string
    export type DTO = string
    export type Response = ISBN
}

export class ISBN {

    private constructor (
        public readonly value: string
    ) {}

    public static create(isbn: ISBN.Request): Result<InvalidISBNError, ISBN.Response> {
        
        const isInvalidISBN = !ISBN.validate(isbn)

        if (isInvalidISBN)
            return failure(new InvalidISBNError(isbn))
        
        return success(new ISBN(isbn))

    }

    public static with(isbn: ISBN.DTO): ISBN.Response {
        return new ISBN(isbn)
    }

    public static validate(isbn: string): boolean {
        return z.string().length(13).or(z.string().length(10)).safeParse(isbn).success
    }

    public to(): ISBN.DTO {
        return this.value
    }

}