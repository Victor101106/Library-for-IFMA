import { FastifyTypedInstance } from '@configs/types'
import { bookController } from '@controllers/book.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CreateBookRequestSchemaByZod, GetBookByCodeRequestSchemaByZod, UpdateBookRequestSchemaByZod } from '@schemas/controllers/book'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/book', {
        onRequest: (request, reply) => authMiddleware.ensureAuthenticationHandle(request, reply),
        schema: {
            tags: ['Book'],
            summary: 'Create book',
            body: CreateBookRequestSchemaByZod.shape.body,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    stockCount: z.number(),
                    createdBy: z.string(),
                    picture: z.string().optional(),
                    subject: z.string(),
                    author: z.string(),
                    genre: z.string(),
                    title: z.string(),
                    code: z.number(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return bookController.createBookHandler(request, reply)
    })

    instance.get('/book/:code', {
        schema: {
            tags: ['Book'],
            summary: 'Get book by code',
            params: GetBookByCodeRequestSchemaByZod.shape.params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    stockCount: z.number(),
                    createdBy: z.string(),
                    picture: z.string().optional(),
                    subject: z.string(),
                    author: z.string(),
                    genre: z.string(),
                    title: z.string(),
                    code: z.number(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return bookController.getBookByCodeHandler(request, reply)
    })

    instance.put('/book/:code', {
        schema: {
            tags: ['Book'],
            summary: 'Update book details',
            params: UpdateBookRequestSchemaByZod.shape.params,
            body: UpdateBookRequestSchemaByZod.shape.body,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    stockCount: z.number(),
                    createdBy: z.string(),
                    picture: z.string().optional(),
                    subject: z.string(),
                    author: z.string(),
                    genre: z.string(),
                    title: z.string(),
                    code: z.number(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return bookController.updateBookHandler(request, reply)
    })

}