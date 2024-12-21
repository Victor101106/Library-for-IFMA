import { FastifyTypedInstance } from '@configs/types'
import { bookController } from '@controllers/book.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CreateBookRequest, DeleteBookRequest, GetBookByIdRequest, UpdateBookRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/book', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Book'],
            summary: 'Create book',
            body: CreateBookRequest.Schema.shape.Body,
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
    }, async (request: FastifyRequest<CreateBookRequest.Type>, reply) => {
        return bookController.createBookHandler(request, reply)
    })

    instance.get('/book/:id', {
        schema: {
            tags: ['Book'],
            summary: 'Get book by id',
            params: GetBookByIdRequest.Schema.shape.Params,
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
    }, async (request: FastifyRequest<GetBookByIdRequest.Type>, reply) => {
        return bookController.getBookByIdHandler(request, reply)
    })

    instance.put('/book/:id', {
        schema: {
            tags: ['Book'],
            summary: 'Update book details',
            params: UpdateBookRequest.Schema.shape.Params,
            body: UpdateBookRequest.Schema.shape.Body,
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
    }, async (request: FastifyRequest<UpdateBookRequest.Type>, reply) => {
        return bookController.updateBookHandler(request, reply)
    })
    
    instance.delete('/book/:id', {
        schema: {
            tags: ['Book'],
            summary: 'Delete book',
            params: DeleteBookRequest.Schema.shape.Params,
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
    }, async (request: FastifyRequest<DeleteBookRequest.Type>, reply) => {
        return bookController.deleteBookHandler(request, reply)
    })

    instance.get('/book/list', {
        schema: {
            tags: ['Book'],
            summary: 'Get all books',
            response: {
                200: z.array(
                    z.object({
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
                )
            }
        }
    }, async (request, reply) => {
        return bookController.getAllBooksHandler(request, reply)
    })

}