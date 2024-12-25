import { badRequest, ok } from '@helpers'
import { AssignAdminRoleToUserRequest } from '@schemas'
import { experimentalService, ExperimentalService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class ExperimentalController {

    private constructor (
        private readonly experimentalService: ExperimentalService
    ) {}

    public static create(experimentalService: ExperimentalService): ExperimentalController {
        return new ExperimentalController(experimentalService)
    }

    public async assignAdminRoleToUserHandler(request: FastifyRequest<AssignAdminRoleToUserRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const assignResult = await this.experimentalService.assignAdminRoleToUser(request.params.userId)

        if (assignResult.failed())
            return badRequest(reply, assignResult.value)

        const assignedUser = assignResult.value

        return ok(reply, assignedUser.to())

    }
    
    public async homeHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        return reply.view('home.experimental.html', {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
        })
    }

}

export const experimentalController = ExperimentalController.create(experimentalService)