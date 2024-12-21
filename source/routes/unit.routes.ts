import { FastifyTypedInstance } from '@configs/types'
import { unitController } from '@controllers/unit.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CreateUnitRequest, DeleteUnitByCodeRequest, GetUnitByCodeRequest, GetUnitsByBookIdRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/book/unit', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Unit'],
            summary: 'Create book unit',
            body: CreateUnitRequest.Schema.shape.Body,
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
    }, async (request: FastifyRequest<CreateUnitRequest.Type>, reply) => {
        return unitController.createUnitHandler(request, reply)
    })

    instance.get('/book/unit/:code', {
        schema: {
            tags: ['Unit'],
            summary: 'Get book unit by code',
            params: GetUnitByCodeRequest.Schema.shape.Params,
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
    }, async (request: FastifyRequest<GetUnitByCodeRequest.Type>, reply) => {
        return unitController.getUnitByCodeHandler(request, reply)
    })

    instance.delete('/book/unit/:code', {
        schema: {
            tags: ['Unit'],
            summary: 'Delete book unit by code',
            params: DeleteUnitByCodeRequest.Schema.shape.Params,
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
    }, async (request: FastifyRequest<DeleteUnitByCodeRequest.Type>, reply) => {
        return unitController.deleteUnitByCodeHandler(request, reply)
    })

    instance.get('/book/unit/list', {
        schema: {
            tags: ['Unit'],
            summary: 'Get all book units',
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
        return unitController.getAllUnitsHandler(request, reply)
    })

    instance.get('/book/:id/units', {
        schema: {
            tags: ['Unit'],
            summary: 'Get book units by book id',
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
    }, async (request: FastifyRequest<GetUnitsByBookIdRequest.Type>, reply) => {
        return unitController.findUnitsByBookId(request, reply)
    })

}