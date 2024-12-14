import { failure, Result, success } from '@helpers'
import { UserModel } from '@models'
import { inMemoryUserRepository } from '@repositories'
import { UserRepository } from '@repositories/contracts'
import { v4 as uuidv4 } from 'uuid'
import { UserNotFoundError } from './errors'

export namespace UserService {
    
    export namespace CreateUser {
        export type Request = {
            googleId: string
            picture: string
            email: string
            name: string
        }
        export type Response = UserModel
    }
    
    export namespace FindUserById {
        export type Request = string
        export type Response = UserModel
    }

}

export class UserService {

    private constructor (private readonly userRepository: UserRepository) {}

    public static create(userRepository: UserRepository): UserService {
        return new UserService(userRepository)
    }

    async createUser(request: UserService.CreateUser.Request): Promise<Result<UserNotFoundError, UserService.CreateUser.Response>> {

        const creationResult = UserModel.create({
            googleId: request.googleId,
            picture: request.picture,
            email: request.email,
            name: request.name,
            id: uuidv4()
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const user = creationResult.value

        await this.userRepository.save(user)

        return success(user)

    }

    async findUserById(request: UserService.FindUserById.Request): Promise<Result<UserNotFoundError, UserService.FindUserById.Response>> {
        
        const userFound = await this.userRepository.findById(request)

        if (!userFound)
            return failure(new UserNotFoundError())

        return success(userFound)

    }

}

export const userService = UserService.create(inMemoryUserRepository)