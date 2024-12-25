import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidURLError } from './errors'

export namespace OptionalURL {
    export type Request = string | undefined
    export type DTO = string | undefined
    export type Response = OptionalURL
}

export class OptionalURL {

    private constructor (
        private url: string | undefined
    ) {}

    public static create(url: OptionalURL.Request): Result<InvalidURLError, OptionalURL.Response> {
        
        const isInvalidURL = url && !OptionalURL.validate(url)

        if (isInvalidURL)
            return failure(new InvalidURLError())
        
        return success(new OptionalURL(url))

    }

    public static with(url: OptionalURL.DTO): OptionalURL.Response {
        return new OptionalURL(url)
    }

    public static validate(url: string): boolean {
        return z.string().url().safeParse(url).success
    }

    public update(url: string): Result<InvalidURLError, string> {

        if (!OptionalURL.validate(url))
            return failure(new InvalidURLError())

        return success(this.url = url)

    }

    public get value(): string | undefined {
        return this.url
    }
    
    public to(): OptionalURL.DTO {
        return this.value
    }

}