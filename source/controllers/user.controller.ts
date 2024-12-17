import { profileRequestSchema } from '@schemas/controllers/user'
import { userService, UserService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UserController {

    private constructor (private readonly userService: UserService) {}

    public static create(userService: UserService): UserController {
        return new UserController(userService)
    }

    async profileHandle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = profileRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return reply.redirect('/logout')

        const { userId } = validationResult.value.locals
        
        const result = await this.userService.findUserById(userId)

        if (result.failed())
            return reply.redirect('/logout')

        const user = result.value

        return reply.view('user/temporary.profile.html', {
            picture: user.picture.value,
            email: user.email.value,
            name: user.name.value
        })

    }

}

export const userController = UserController.create(userService)