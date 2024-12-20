import { failure, Result, success } from '@helpers'
import { RoleEnum, User } from '@models'
import { inMemoryUserRepository } from '@repositories'
import { UserRepository } from '@repositories/contracts'
import { UserNotFoundError } from './errors'

export namespace UserService {
    
    export namespace FindByGoogleIdOrCreateUser {
        export type Request = {
            googleId: string
            picture?: string
            email?: string
            name?: string
        }
        export type Response = User
    }

    export namespace CreateUser {
        export type Request = {
            googleId: string
            picture: string
            email: string
            name: string
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

    public async findByGoogleIdOrCreateUser(request: UserService.FindByGoogleIdOrCreateUser.Request): Promise<Result<Error, UserService.FindByGoogleIdOrCreateUser.Response>> {

        const userFound = await this.userRepository.findByGoogleId(request.googleId)

        if (userFound)
            return success(userFound)
            
        const creationResult = await this.createUser({
            googleId: String(request.googleId),
            picture: String(request.picture),
            email: String(request.email),
            name: String(request.name)
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const user = creationResult.value

        return success(user)

    }

    public async createUser(request: UserService.CreateUser.Request): Promise<Result<UserNotFoundError, UserService.CreateUser.Response>> {

        const creationResult = User.create({
            googleId: request.googleId,
            picture: request.picture,
            email: request.email,
            name: request.name,
            role: RoleEnum.Pending
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const user = creationResult.value

        await this.userRepository.save(user)

        return success(user)

    }
    
    public async findUserByGoogleId(googleId: UserService.FindUserByGoogleId.Request): Promise<Result<UserNotFoundError, UserService.FindUserByGoogleId.Response>> {

        const userFound = await this.userRepository.findByGoogleId(googleId)

        if (!userFound)
            return failure(new UserNotFoundError())

        return success(userFound)

    }

    public async findUserById(userId: UserService.FindUserById.Request): Promise<Result<UserNotFoundError, UserService.FindUserById.Response>> {
        
        const userFound = await this.userRepository.findById(userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        return success(userFound)

    }

}

export const userService = UserService.create(inMemoryUserRepository)