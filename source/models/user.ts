import { failure, Result, success } from '@helpers'
import { Email, GoogleId, Id, Name, Picture, Registration, Role, Siape, Timestamp } from './index'

export namespace User {
    export type Request = {
        registration?: string
        googleId     : string
        picture      : string
        siape?       : number
        email        : string
        name         : string
        role         : string
    }
    export type DTO = Request & {
        createdAt: number
        updatedAt: number
        id       : string
    }
    export type Response = User
}

export class User {

    private constructor (
        public readonly registration: Registration,
        public readonly createdAt   : Timestamp,
        public readonly updatedAt   : Timestamp,
        public readonly googleId    : GoogleId,
        public readonly picture     : Picture,
        public readonly siape       : Siape,
        public readonly email       : Email,
        public readonly role        : Role,
        public readonly name        : Name,
        public readonly id          : Id
    ) {}

    public static create(request: User.Request): Result<Error, User.Response> {
        
        const registrationResult = Registration.create(request.registration)
        const googleIdResult     = GoogleId    .create(request.googleId)
        const pictureResult      = Picture     .create(request.picture)
        const siapeResult        = Siape       .create(request.siape)
        const emailResult        = Email       .create(request.email)
        const nameResult         = Name        .create(request.name)
        const roleResult         = Role        .create(request.role)

        if (registrationResult.failed())
            return failure(registrationResult.value)
        
        if (googleIdResult.failed())
            return failure(googleIdResult.value)
        
        if (pictureResult.failed())
            return failure(pictureResult.value)
        
        if (siapeResult.failed())
            return failure(siapeResult.value)

        if (emailResult.failed())
            return failure(emailResult.value)
        
        if (nameResult.failed())
            return failure(nameResult.value)
        
        if (roleResult.failed())
            return failure(roleResult.value)
        
        const registration = registrationResult.value
        const googleId     = googleIdResult.value
        const picture      = pictureResult.value
        const siape        = siapeResult.value
        const email        = emailResult.value
        const role         = roleResult.value
        const name         = nameResult.value
        
        const createdAt = Timestamp.create()
        const updatedAt = Timestamp.create()
        const id        = Id       .create()
        
        return success(new User(registration, createdAt, updatedAt, googleId, picture, siape, email, role, name, id))

    }

    public static with(data: User.DTO): User.Response {
        
        const registration = Registration.with(data.registration)
        const createdAt    = Timestamp   .with(data.createdAt)
        const updatedAt    = Timestamp   .with(data.updatedAt)
        const googleId     = GoogleId    .with(data.googleId)
        const picture      = Picture     .with(data.picture)
        const siape        = Siape       .with(data.siape)
        const email        = Email       .with(data.email)
        const role         = Role        .with(data.role)
        const name         = Name        .with(data.name)
        const id           = Id          .with(data.id)
        
        return new User(registration, createdAt, updatedAt, googleId, picture, siape, email, role, name, id)

    }

}