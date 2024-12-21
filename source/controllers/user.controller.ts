import { ok, unauthorized } from '@helpers'
import { userService, UserService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UserController {

    private constructor (private readonly userService: UserService) {}

    public static create(userService: UserService): UserController {
        return new UserController(userService)
    }

    public async profileHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const result = await this.userService.findUserById(String(request.locals.userId))

        if (result.failed())
            return unauthorized(reply, result.value)

        const user = result.value

        return ok(reply, user.to())

    }

}

export const userController = UserController.create(userService)