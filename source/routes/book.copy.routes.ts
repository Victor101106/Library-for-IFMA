import { FastifyTypedInstance } from '@configs/types'
import { bookCopyController } from '@controllers/book.copy.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CreateBookCopyRequest, DeleteBookCopyByCodeRequest, GetBookCopyByCodeRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/book/copy', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Book Copy'],
            summary: 'Create book copy',
            body: CreateBookCopyRequest.Schema.shape.Body,
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
    }, async (request: FastifyRequest<CreateBookCopyRequest.Type>, reply) => {
        return bookCopyController.createBookCopyHandler(request, reply)
    })

    instance.get('/book/copy/:code', {
        schema: {
            tags: ['Book Copy'],
            summary: 'Get book copy by code',
            params: GetBookCopyByCodeRequest.Schema.shape.Params,
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
    }, async (request: FastifyRequest<GetBookCopyByCodeRequest.Type>, reply) => {
        return bookCopyController.getBookCopyByCodeHandler(request, reply)
    })

    instance.delete('/book/copy/:code', {
        schema: {
            tags: ['Book Copy'],
            summary: 'Delete book copy by code',
            params: DeleteBookCopyByCodeRequest.Schema.shape.Params,
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
    }, async (request: FastifyRequest<DeleteBookCopyByCodeRequest.Type>, reply) => {
        return bookCopyController.deleteBookCopyByCodeHandler(request, reply)
    })

    instance.get('/book/copy/list', {
        schema: {
            tags: ['Book Copy'],
            summary: 'Get all book copies',
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
        return bookCopyController.getAllBookCopiesHandler(request, reply)
    })

}