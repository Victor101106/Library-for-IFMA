import { FastifyTypedInstance } from '@configs/types'
import { bookCopyController } from '@controllers/book.copy.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CreateBookCopyRequestSchemaByZod, GetBookCopyByCodeRequestSchemaByZod } from '@schemas/controllers/book.copy'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/book/copy', {
        onRequest: (request, reply) => authMiddleware.ensureAuthenticationHandle(request, reply),
        schema: {
            tags: ['Book Copy'],
            summary: 'Create book copy',
            body: CreateBookCopyRequestSchemaByZod.shape.body,
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
    }, async (request, reply) => {
        return bookCopyController.createBookCopyHandler(request, reply)
    })

    instance.get('/book/copy/:code', {
        schema: {
            tags: ['Book Copy'],
            summary: 'Get book copy by code',
            params: GetBookCopyByCodeRequestSchemaByZod.shape.params,
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
    }, async (request, reply) => {
        return bookCopyController.getBookCopyByCodeHandler(request, reply)
    })

}