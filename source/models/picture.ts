import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidPictureError } from './errors'

export namespace Picture {
    export type Request = string | undefined
    export type DTO = string | undefined
    export type Response = Picture
}

export class Picture {

    private constructor (
        private picture: string | undefined
    ) {}

    public static create(picture: Picture.Request): Result<InvalidPictureError, Picture.Response> {
        
        const isInvalidPicture = picture && !Picture.validate(picture)

        if (isInvalidPicture)
            return failure(new InvalidPictureError())
        
        return success(new Picture(picture))

    }

    public static with(picture: Picture.DTO): Picture.Response {
        return new Picture(picture)
    }

    public static validate(picture: string): boolean {
        return z.string().url().safeParse(picture).success
    }

    public update(picture: string): Result<InvalidPictureError, string> {

        if (!Picture.validate(picture))
            return failure(new InvalidPictureError())

        return success(this.picture = picture)

    }

    public get value(): string | undefined {
        return this.picture
    }
    
    public to(): Picture.DTO {
        return this.value
    }

}