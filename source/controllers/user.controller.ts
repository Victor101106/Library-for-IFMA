import { badRequest, ok, unauthorized } from '@helpers'
import { DeleteUserRequest, FindUserByIdRequest, UpdateMeRequest, UpdateUserRequest } from '@schemas/controllers'
import { userService, UserService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UserController {

    private constructor (private readonly userService: UserService) {}

    public static create(userService: UserService): UserController {
        return new UserController(userService)
    }

    public async updateUserHandler(request: FastifyRequest<UpdateUserRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const updateResult = await this.userService.updateUser({...request.body, ...request.params})

        if (updateResult.failed())
            return badRequest(reply, updateResult.value)

        const updatedUser = updateResult.value

        return ok(reply, updatedUser.to())

    }

    public async updateMeHandler(request: FastifyRequest<UpdateMeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const authenticatedUserId = String(request.locals.userId)

        const updateResult = await this.userService.updateUser({ ...request.body, userId: authenticatedUserId })

        if (updateResult.failed())
            return badRequest(reply, updateResult.value)

        const updatedUser = updateResult.value

        return ok(reply, updatedUser.to())

    }

    public async deleteUserHandler(request: FastifyRequest<DeleteUserRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const deleteResult = await this.userService.deleteUser(request.params.userId)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const deletedUser = deleteResult.value

        return ok(reply, deletedUser.to())

    }

    public async findAllUsersHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const usersFound = await this.userService.findAllUsers()

        const usersFoundTo = usersFound.map(userFound => userFound.to())

        return ok(reply, usersFoundTo)

    }

    public async findUserByIdHandler(request: FastifyRequest<FindUserByIdRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const findResult = await this.userService.findUserById(request.params.userId)

        if (findResult.failed())
            return badRequest(reply,findResult.value)

        const userFound = findResult.value

        return ok(reply, userFound.to())

    }

    public async findMeHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const findResult = await this.userService.findUserById(String(request.locals.userId))

        if (findResult.failed())
            return unauthorized(reply, findResult.value)

        const userFound = findResult.value

        return ok(reply, userFound.to())

    }

}

export const userController = UserController.create(userService)