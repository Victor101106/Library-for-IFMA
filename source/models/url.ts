import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidURLError } from './errors'

export namespace URL {
    export type Request = string | undefined
    export type DTO = string | undefined
    export type Response = URL
}

export class URL {

    private constructor (
        private url: string | undefined
    ) {}

    public static create(url: URL.Request): Result<InvalidURLError, URL.Response> {
        
        const isInvalidURL = url && !URL.validate(url)

        if (isInvalidURL)
            return failure(new InvalidURLError())
        
        return success(new URL(url))

    }

    public static with(url: URL.DTO): URL.Response {
        return new URL(url)
    }

    public static validate(url: string): boolean {
        return z.string().url().safeParse(url).success
    }

    public update(url: string): Result<InvalidURLError, string> {

        if (!URL.validate(url))
            return failure(new InvalidURLError())

        return success(this.url = url)

    }

    public get value(): string | undefined {
        return this.url
    }
    
    public to(): URL.DTO {
        return this.value
    }

}