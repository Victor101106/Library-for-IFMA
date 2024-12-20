import { FastifyTypedInstance } from '@configs/types'
import { bookController } from '@controllers/book.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CreateBookRequestSchemaByZod, DeleteBookRequestSchemaByZod, GetBookByIdRequestSchemaByZod, UpdateBookRequestSchemaByZod } from '@schemas/controllers/book'
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
                    createdBy: z.string(),
                    picture: z.string().optional(),
                    subject: z.string(),
                    author: z.string(),
                    genre: z.string(),
                    title: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return bookController.createBookHandler(request, reply)
    })

    instance.get('/book/:id', {
        schema: {
            tags: ['Book'],
            summary: 'Get book by id',
            params: GetBookByIdRequestSchemaByZod.shape.params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    createdBy: z.string(),
                    picture: z.string().optional(),
                    subject: z.string(),
                    author: z.string(),
                    genre: z.string(),
                    title: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return bookController.getBookByIdHandler(request, reply)
    })

    instance.put('/book/:id', {
        schema: {
            tags: ['Book'],
            summary: 'Update book details',
            params: UpdateBookRequestSchemaByZod.shape.params,
            body: UpdateBookRequestSchemaByZod.shape.body,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    createdBy: z.string(),
                    picture: z.string().optional(),
                    subject: z.string(),
                    author: z.string(),
                    genre: z.string(),
                    title: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return bookController.updateBookHandler(request, reply)
    })
    
    instance.delete('/book/:id', {
        schema: {
            tags: ['Book'],
            summary: 'Delete book',
            params: DeleteBookRequestSchemaByZod.shape.params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    createdBy: z.string(),
                    picture: z.string().optional(),
                    subject: z.string(),
                    author: z.string(),
                    genre: z.string(),
                    title: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request, reply) => {
        return bookController.deleteBookHandler(request, reply)
    })

}