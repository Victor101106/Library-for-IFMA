import { FastifyTypedInstance } from '@configs'
import { experimentalController } from '@controllers'
import { AssignAdminRoleToUserRequest, UserSchema } from '@schemas'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {
    
    instance.get('/', {
        schema: {
            tags: ['Experimental'],
            summary: 'Experimental view of the Sign in with Google button',
            response: {
                200: z.string()
            }
        }
    }, async (request, reply) => {
        return experimentalController.homeHandler(request, reply)
    })

    instance.post('/users/assign/admin/:userId', {
        schema: {
            tags: ['Experimental'],
            summary: 'Assign administrator role to user',
            params: AssignAdminRoleToUserRequest.Schema.shape.Params,
            response: {
                200: UserSchema
            }
        }
    }, async (request: FastifyRequest<AssignAdminRoleToUserRequest.Type>, reply) => {
        return experimentalController.assignAdminRoleToUserHandler(request, reply)
    })

}