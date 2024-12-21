import { FastifyTypedInstance } from '@configs/types'
import { replicaController } from '@controllers/replica.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CreateReplicaRequest, DeleteReplicaByCodeRequest, GetReplicaByCodeRequest, GetReplicasByBookIdRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/book/replica', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Replica'],
            summary: 'Create book replica',
            body: CreateReplicaRequest.Schema.shape.Body,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    createdBy: z.string(),
                    available: z.boolean(),
                    bookId: z.string(),
                    code: z.number(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<CreateReplicaRequest.Type>, reply) => {
        return replicaController.createReplicaHandler(request, reply)
    })

    instance.get('/book/replica/:code', {
        schema: {
            tags: ['Replica'],
            summary: 'Get book replica by code',
            params: GetReplicaByCodeRequest.Schema.shape.Params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    available: z.boolean(),
                    createdBy: z.string(),
                    bookId: z.string(),
                    code: z.number(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<GetReplicaByCodeRequest.Type>, reply) => {
        return replicaController.getReplicaByCodeHandler(request, reply)
    })

    instance.delete('/book/replica/:code', {
        schema: {
            tags: ['Replica'],
            summary: 'Delete book replica by code',
            params: DeleteReplicaByCodeRequest.Schema.shape.Params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    available: z.boolean(),
                    createdBy: z.string(),
                    bookId: z.string(),
                    code: z.number(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<DeleteReplicaByCodeRequest.Type>, reply) => {
        return replicaController.deleteReplicaByCodeHandler(request, reply)
    })

    instance.get('/book/replica/list', {
        schema: {
            tags: ['Replica'],
            summary: 'Get all book replicas',
            response: {
                200: z.array(
                    z.object({
                        createdAt: z.number(),
                        updatedAt: z.number(),
                        available: z.boolean(),
                        createdBy: z.string(),
                        bookId: z.string(),
                        code: z.number(),
                        id: z.string()
                    })
                )
            }
        }
    }, async (request, reply) => {
        return replicaController.getAllReplicasHandler(request, reply)
    })

    instance.get('/book/:id/replicas', {
        schema: {
            tags: ['Replica'],
            summary: 'Get book replicas by book id',
            response: {
                200: z.array(
                    z.object({
                        createdAt: z.number(),
                        updatedAt: z.number(),
                        available: z.boolean(),
                        createdBy: z.string(),
                        bookId: z.string(),
                        code: z.number(),
                        id: z.string()
                    })
                )
            }
        }
    }, async (request: FastifyRequest<GetReplicasByBookIdRequest.Type>, reply) => {
        return replicaController.findReplicasByBookId(request, reply)
    })

}