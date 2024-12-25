import { FastifyTypedInstance } from '@configs'
import { userController } from '@controllers'
import { authMiddleware } from '@middlewares'
import { DeleteUserRequest, FindUserByIdRequest, UpdateMeRequest, UpdateUserRequest, UserSchema } from '@schemas'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.get('/users/me', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Users'],
            summary: 'Get authenticated user',
            response: {
                200: UserSchema
            }
        }
    }, async (request, reply) => {
        return userController.findMeHandler(request, reply)
    })

    instance.get('/users/', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Users'],
            summary: 'Get all users',
            response: {
                200: z.array(UserSchema)
            }
        }
    }, async (request: FastifyRequest, reply) => {
        return userController.findAllUsersHandler(request, reply)
    })

    instance.get('/users/:userId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Users'],
            summary: 'Get user',
            params: FindUserByIdRequest.Schema.shape.Params,
            response: {
                200: UserSchema
            }
        }
    }, async (request: FastifyRequest<FindUserByIdRequest.Type>, reply) => {
        return userController.findUserByIdHandler(request, reply)
    })

    instance.put('/users/:userId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Users'],
            summary: 'Update user',
            params: UpdateUserRequest.Schema.shape.Params,
            body: UpdateUserRequest.Schema.shape.Body,
            response: {
                200: UserSchema
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
                200: UserSchema
            }
        }
    }, async (request: FastifyRequest<UpdateMeRequest.Type>, reply) => {
        return userController.updateMeHandler(request, reply)
    })

    instance.delete('/users/:userId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Users'],
            summary: 'Delete user',
            params: DeleteUserRequest.Schema.shape.Params,
            response: {
                200: UserSchema
            }
        }
    }, async (request: FastifyRequest<DeleteUserRequest.Type>, reply) => {
        return userController.deleteUserHandler(request, reply)
    })

}