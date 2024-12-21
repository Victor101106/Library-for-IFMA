import { failure, Result, success } from '@helpers'
import { RoleEnum, User } from '@models'
import { inMemoryUserRepository } from '@repositories'
import { UserRepository } from '@repositories/contracts'
import { UserAlreadyHasRoleError, UserNotFoundError } from './errors'

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
    
    export namespace CompleteSignUp {
        export type Request = {
            registration: string
            userId: string
            siape?: void
        } | {
            registration?: void
            userId: string
            siape: number
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
            role: RoleEnum.Unverified
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const user = creationResult.value

        await this.userRepository.saveOne(user)

        return success(user)

    }

    public async completeSignUp(request: UserService.CompleteSignUp.Request): Promise<Result<UserAlreadyHasRoleError, UserService.CompleteSignUp.Response>> {

        const userResult = await this.findUserById(request.userId)

        if (userResult.failed())
            return failure(userResult.value)

        const user = userResult.value

        if (user.role.value !== RoleEnum.Unverified)
            return failure(new UserAlreadyHasRoleError())

        const updateResult = user.update({
            registration: request.registration,
            siape: request.siape,
            role: request.registration ? RoleEnum.Student : RoleEnum.Employee
        })

        if (updateResult.failed())
            return failure(updateResult.value)

        await this.userRepository.saveOne(user)

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