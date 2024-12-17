import { failure, Result, success } from '@helpers'
import { User } from '@models'
import { inMemoryUserRepository } from '@repositories'
import { UserRepository } from '@repositories/contracts'
import { UserNotFoundError } from './errors'

export namespace UserService {
    
    export namespace CreateUser {
        export type Request = {
            googleId: string
            picture: string
            email: string
            name: string
            role: string
        }
        export type Response = User
    }
    
    export namespace FindUserByGoogleId {
        export type Request = string
        export type Response = User
    }

    export namespace FindUserById {
        export type Request = string
        export type Response = User
    }

}

export class UserService {

    private constructor (private readonly userRepository: UserRepository) {}

    public static create(userRepository: UserRepository): UserService {
        return new UserService(userRepository)
    }

    async createUser(request: UserService.CreateUser.Request): Promise<Result<UserNotFoundError, UserService.CreateUser.Response>> {

        const creationResult = User.create({
            googleId: request.googleId,
            picture: request.picture,
            email: request.email,
            name: request.name,
            role: request.role
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const user = creationResult.value

        await this.userRepository.save(user)

        return success(user)

    }
    
    async findUserByGoogleId(googleId: UserService.FindUserByGoogleId.Request): Promise<Result<UserNotFoundError, UserService.FindUserByGoogleId.Response>> {

        const userFound = await this.userRepository.findByGoogleId(googleId)

        if (!userFound)
            return failure(new UserNotFoundError())

        return success(userFound)

    }

    async findUserById(userId: UserService.FindUserById.Request): Promise<Result<UserNotFoundError, UserService.FindUserById.Response>> {
        
        const userFound = await this.userRepository.findById(userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        return success(userFound)

    }

}

export const userService = UserService.create(inMemoryUserRepository)