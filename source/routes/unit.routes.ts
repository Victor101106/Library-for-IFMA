import { FastifyTypedInstance } from '@configs/types'
import { unitController } from '@controllers/unit.controller'
import { authMiddleware } from '@middlewares/authentication.middleware'
import { CreateUnitRequest, DeleteUnitByCodeRequest, FindUnitByCodeRequest, FindUnitsByBookIdRequest, UpdateUnitRequest } from '@schemas/controllers'
import { UnitSchema } from '@schemas/models'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/books/:bookId/units', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Units'],
            summary: 'Create book unit',
            params: CreateUnitRequest.Schema.shape.Params,
            body: CreateUnitRequest.Schema.shape.Body,
            response: {
                200: UnitSchema
            }
        }
    }, async (request: FastifyRequest<CreateUnitRequest.Type>, reply) => {
        return unitController.createUnitHandler(request, reply)
    })

    instance.get('/books/:bookId/units', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Units'],
            summary: 'Get book units by book id',
            params: FindUnitsByBookIdRequest.Schema.shape.Params,
            response: {
                200: z.array(UnitSchema)
            }
        }
    }, async (request: FastifyRequest<FindUnitsByBookIdRequest.Type>, reply) => {
        return unitController.findUnitsByBookId(request, reply)
    })

    instance.get('/books/units', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Units'],
            summary: 'Get all book units',
            response: {
                200: z.array(UnitSchema)
            }
        }
    }, async (request, reply) => {
        return unitController.findAllUnitsHandler(request, reply)
    })

    instance.get('/books/units/:unitCode', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Units'],
            summary: 'Get book unit by code',
            params: FindUnitByCodeRequest.Schema.shape.Params,
            response: {
                200: UnitSchema
            }
        }
    }, async (request: FastifyRequest<FindUnitByCodeRequest.Type>, reply) => {
        return unitController.findUnitByCodeHandler(request, reply)
    })

    instance.put('/books/units/:unitCode', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Units'],
            summary: 'Update book unit',
            params: UpdateUnitRequest.Schema.shape.Params,
            body: UpdateUnitRequest.Schema.shape.Body,
            response: {
                200: UnitSchema
            }
        }
    }, async (request: FastifyRequest<UpdateUnitRequest.Type>, reply) => {
        return unitController.updateUnitHandler(request, reply)
    })

    instance.delete('/books/units/:unitCode', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Units'],
            summary: 'Delete book unit by code',
            params: DeleteUnitByCodeRequest.Schema.shape.Params,
            response: {
                200: UnitSchema
            }
        }
    }, async (request: FastifyRequest<DeleteUnitByCodeRequest.Type>, reply) => {
        return unitController.deleteUnitByCodeHandler(request, reply)
    })

}