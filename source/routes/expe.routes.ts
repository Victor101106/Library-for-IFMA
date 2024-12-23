import { FastifyTypedInstance } from '@configs/types'
import { experimentalController } from '@controllers/experimental.controller'
import { AssignAdminRoleToUserRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/users/assign/admin/:userId', {
        schema: {
            tags: ['Experimental'],
            summary: 'Assign administrator role to user',
            params: AssignAdminRoleToUserRequest.Schema.shape.Params,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    oAuthId: z.string(),
                    picture: z.string(),
                    siape: z.number().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<AssignAdminRoleToUserRequest.Type>, reply) => {
        return experimentalController.assignAdminRoleToUserHandler(request, reply)
    })

}