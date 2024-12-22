import { failure, Result, success } from '@helpers'
import { RoleEnum, User } from '@models'
import { inMemoryUserRepository } from '@repositories'
import { UserRepository } from '@repositories/contracts'
import { GoogleIdAlreadyInUseError, UserAlreadyHasRoleError, UserNotFoundError } from './errors'

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

    export namespace UpdateUser {
        export type Request = {
            registration?: string
            picture?: string
            siape?: number
            name?: string
            role?: string
            userId: string
        }
        export type Response = User
    }

    export namespace UpdateMe {
        export type Request = {
            picture?: string
            name?: string
            userId: string
        }
        export type Response = User
    }
    
    export namespace AssignRoleToUser {
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
    
    export namespace FindAllUsers {
        export type Request = void
        export type Response = Array<User>
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
            
        const createResult = await this.createUser({
            googleId: String(request.googleId),
            picture: String(request.picture),
            email: String(request.email),
            name: String(request.name)
        })

        if (createResult.failed())
            return failure(createResult.value)

        const userCreated = createResult.value

        await this.userRepository.saveOne(userCreated)

        return success(userCreated)

    }

    public async createUser(request: UserService.CreateUser.Request): Promise<Result<GoogleIdAlreadyInUseError | UserNotFoundError, UserService.CreateUser.Response>> {

        const userFound = await this.userRepository.findByGoogleId(request.googleId)

        if (userFound)
            return failure(new GoogleIdAlreadyInUseError())

        const createResult = User.create({
            googleId: request.googleId,
            picture: request.picture,
            email: request.email,
            name: request.name,
            role: RoleEnum.Unverified
        })

        if (createResult.failed())
            return failure(createResult.value)

        const userCreated = createResult.value

        await this.userRepository.saveOne(userCreated)

        return success(userCreated)

    }

    public async updateUser(request: UserService.UpdateUser.Request): Promise<Result<UserNotFoundError, UserService.UpdateUser.Response>> {

        const userFound = await this.userRepository.findById(request.userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        const updateResult = userFound.update({
            registration: request.registration,
            picture: request.picture,
            siape: request.siape,
            role: request.role,
            name: request.name
        })

        if (updateResult.failed())
            return failure(updateResult.value)

        const updatedUser = updateResult.value

        await this.userRepository.updateOne(updatedUser)

        return success(updatedUser)

    }

    public async updateMe(request: UserService.UpdateMe.Request): Promise<Result<UserNotFoundError, UserService.UpdateMe.Response>> {

        const userFound = await this.userRepository.findById(request.userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        const updateResult = userFound.update({
            picture: request.picture,
            name: request.name
        })

        if (updateResult.failed())
            return failure(updateResult.value)

        const updatedUser = updateResult.value

        await this.userRepository.updateOne(updatedUser)

        return success(updatedUser)

    }

    public async assignRoleToUser(request: UserService.AssignRoleToUser.Request): Promise<Result<UserAlreadyHasRoleError | UserNotFoundError, UserService.AssignRoleToUser.Response>> {

        const userFound = await this.userRepository.findById(request.userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        if (userFound.role.value !== RoleEnum.Unverified)
            return failure(new UserAlreadyHasRoleError())

        const updateResult = userFound.update({
            registration: request.registration,
            siape: request.siape,
            role: request.registration ? RoleEnum.Student : RoleEnum.Employee
        })

        if (updateResult.failed())
            return failure(updateResult.value)

        const updatedUser = updateResult.value

        await this.userRepository.updateOne(updatedUser)

        return success(updatedUser)

    }

    public async findAllUsers(): Promise<UserService.FindAllUsers.Response> {
        return await this.userRepository.findAll()
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