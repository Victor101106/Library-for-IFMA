import { FastifyTypedInstance } from '@configs/types'
import { userController } from '@controllers'
import { authMiddleware } from '@middlewares'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {
    instance.get('/profile', {
        onRequest: (request, reply) => authMiddleware.ensureAuthenticationHandle(request, reply),
        schema: {
            tags: ['User'],
            summary: 'Get authenticated user profile',
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    googleId: z.string(),
                    picture: z.string(),
                    siape: z.string().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return userController.profileHandler(request, reply)
    })
}