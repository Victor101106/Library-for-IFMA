import { failure, Result, success } from '@helpers'
import { RoleEnum, User } from '@models'
import { inMemoryUserRepository } from '@repositories'
import { UserRepository } from '@repositories/contracts'
import { UserNotFoundError } from './errors'

export namespace ExperimentalService {
    
    export namespace AssignAdminRoleToUser {
        export type Request = string
        export type Response = User
    }

}

export class ExperimentalService {

    private constructor (private readonly userRepository: UserRepository) {}

    public static create(userRepository: UserRepository): ExperimentalService {
        return new ExperimentalService(userRepository)
    }

    public async assignAdminRoleToUser(userId: ExperimentalService.AssignAdminRoleToUser.Request): Promise<Result<UserNotFoundError, ExperimentalService.AssignAdminRoleToUser.Response>> {

        const userFound = await this.userRepository.findById(userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        const updateResult = userFound.update({
            role: RoleEnum.Admin
        })

        if (updateResult.failed())
            return failure(updateResult.value)

        const updatedUser = updateResult.value

        await this.userRepository.saveOne(updatedUser)

        return success(updatedUser)

    }

}

export const experimentalService = ExperimentalService.create(inMemoryUserRepository)