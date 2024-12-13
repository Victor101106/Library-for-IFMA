import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidEmailError, InvalidIdError, InvalidNameError, InvalidPictureError } from './errors'

export namespace UserModel {
    export type Request = {
        googleId: string,
        picture: string,
        email: string,
        name: string,
        id: string
    }
    export type DTO = Request & {
        createdAt: number,
        updatedAt: number
    }
    export type Response = UserModel
}

export class UserModel {

    private constructor (
        public readonly googleId: string,
        public readonly picture: string,
        public readonly email: string,
        public readonly name: string,
        public readonly id: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}

    public static create(request: UserModel.Request): Result<Error, UserModel.Response> {
        
        const validationResult = UserModel.validateRequest(request)

        if (validationResult.failed())
            return failure(validationResult.value)
        
        return success(new UserModel(request.googleId, request.picture, request.email, request.name, request.id, new Date(), new Date()))

    }

    public static with(data: UserModel.DTO): UserModel.Response {
        return new UserModel(data.googleId, data.picture, data.email, data.name, data.id, new Date(data.createdAt), new Date(data.updatedAt))
    }

    public static validateRequest(request: UserModel.Request): Result<Error, UserModel.Request> {

        if (!UserModel.validatePicture(request.email))
            return failure(new InvalidPictureError)
        
        if (!UserModel.validateEmail(request.email))
            return failure(new InvalidEmailError(request.email))
        
        if (!UserModel.validateName(request.name))
            return failure(new InvalidNameError(request.name))
        
        if (!UserModel.validateId(request.id) || !UserModel.validateId(request.googleId))
            return failure(new InvalidIdError())

        return success(request)

    }

    public static validatePicture(picture: string): boolean {
        return z.string().url().safeParse(picture).success
    }

    public static validateEmail(email: string): boolean {
        return z.string().email().safeParse(email).success
    }

    public static validateName(name: string): boolean {
        return z.string().min(2).safeParse(name).success
    }

    public static validateId(id: string): boolean {
        return z.string().min(1).safeParse(id).success
    }

}