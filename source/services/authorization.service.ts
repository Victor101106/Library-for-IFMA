import { failure, Result, success } from '@helpers'
import { User } from '@models'
import { inMemoryUserRepository } from '@repositories'
import { UserRepository } from '@repositories/contracts'
import { AppAbility, defineAbilityFor } from '../authorization'
import { UserNotFoundError } from './errors'

export namespace AuthorizationService {

    export namespace GetPermissionsByUserId {
        export type Request = string
        export type Response = AppAbility
    }
    
    export namespace GetPermissionsByUser {
        export type Request = User
        export type Response = AppAbility
    }
    
}

export class AuthorizationService {

    private constructor (
        private readonly userRepository: UserRepository
    ) {}

    public static create(userRepository: UserRepository): AuthorizationService {
        return new AuthorizationService(userRepository)
    }

    public async getPermissionsByUserId(userId: AuthorizationService.GetPermissionsByUserId.Request): Promise<Result<UserNotFoundError, AuthorizationService.GetPermissionsByUserId.Response>> {
        
        const userFound = await this.userRepository.findById(userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        return success(this.getPermissionsByUser(userFound))

    }

    public getPermissionsByUser(user: AuthorizationService.GetPermissionsByUser.Request): AuthorizationService.GetPermissionsByUser.Response {
        return defineAbilityFor(user)
    }

}

export const authorizationService = AuthorizationService.create(inMemoryUserRepository)