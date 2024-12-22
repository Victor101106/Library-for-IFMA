import { FastifyTypedInstance } from '@configs/types'
import { userController } from '@controllers'
import { authMiddleware } from '@middlewares'
import { FindUserByIdRequest, UpdateMeRequest, UpdateUserRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.get('/users/me', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Users'],
            summary: 'Get authenticated user',
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    googleId: z.string(),
                    picture: z.string(),
                    siape: z.number().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return userController.findMeHandler(request, reply)
    })

    instance.get('/users/', {
        schema: {
            tags: ['Users'],
            summary: 'Get all users',
            response: {
                200: z.array(
                    z.object({
                        registration: z.string().optional(),
                        createdAt: z.number(),
                        updatedAt: z.number(),
                        googleId: z.string(),
                        picture: z.string(),
                        siape: z.number().optional(),
                        email: z.string(),
                        role: z.string(),
                        name: z.string(),
                        id: z.string()
                    })
                )
            }
        }
    }, async (request: FastifyRequest, reply) => {
        return userController.findAllUsersHandler(request, reply)
    })

    instance.get('/users/:userId', {
        schema: {
            tags: ['Users'],
            summary: 'Get user',
            params: FindUserByIdRequest.Schema.shape.Params,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    googleId: z.string(),
                    picture: z.string(),
                    siape: z.number().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<FindUserByIdRequest.Type>, reply) => {
        return userController.findUserByIdHandler(request, reply)
    })

    instance.put('/users/:userId', {
        schema: {
            tags: ['Users'],
            summary: 'Update user',
            params: UpdateUserRequest.Schema.shape.Params,
            body: UpdateUserRequest.Schema.shape.Body,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    googleId: z.string(),
                    picture: z.string(),
                    siape: z.number().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<UpdateUserRequest.Type>, reply) => {
        return userController.updateUserHandler(request, reply)
    })

    instance.put('/users/me', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Users'],
            summary: 'Update authenticated user',
            body: UpdateMeRequest.Schema.shape.Body,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    googleId: z.string(),
                    picture: z.string(),
                    siape: z.number().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<UpdateMeRequest.Type>, reply) => {
        return userController.updateMeHandler(request, reply)
    })

}