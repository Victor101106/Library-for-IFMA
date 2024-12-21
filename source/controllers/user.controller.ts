import { ok, unauthorized } from '@helpers'
import { userService, UserService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UserController {

    private constructor (private readonly userService: UserService) {}

    public static create(userService: UserService): UserController {
        return new UserController(userService)
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