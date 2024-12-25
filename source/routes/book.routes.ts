import { FastifyTypedInstance } from '@configs'
import { bookController } from '@controllers'
import { authMiddleware } from '@middlewares'
import { BookSchema, CreateBookRequest, DeleteBookRequest, FindBookByIdRequest, SearchBooksRequest, UpdateBookRequest } from '@schemas'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/books', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Books'],
            summary: 'Create book',
            body: CreateBookRequest.Schema.shape.Body,
            response: {
                200: BookSchema
            }
        }
    }, async (request: FastifyRequest<CreateBookRequest.Type>, reply) => {
        return bookController.createBookHandler(request, reply)
    })

    instance.get('/books', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Books'],
            summary: 'Get all books',
            response: {
                200: z.array(BookSchema)
            }
        }
    }, async (request, reply) => {
        return bookController.findAllBooksHandler(request, reply)
    })

    instance.get('/books/search', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Books'],
            summary: 'Search books',
            querystring: SearchBooksRequest.Schema.shape.Querystring,
            response: {
                200: z.array(BookSchema)
            }
        }
    }, async (request: FastifyRequest<SearchBooksRequest.Type>, reply) => {
        return bookController.searchBooksHandler(request, reply)
    })

    instance.get('/books/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Books'],
            summary: 'Get book by id',
            params: FindBookByIdRequest.Schema.shape.Params,
            response: {
                200: BookSchema
            }
        }
    }, async (request: FastifyRequest<FindBookByIdRequest.Type>, reply) => {
        return bookController.findBookByIdHandler(request, reply)
    })

    instance.put('/books/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Books'],
            summary: 'Update book',
            params: UpdateBookRequest.Schema.shape.Params,
            body: UpdateBookRequest.Schema.shape.Body,
            response: {
                200: BookSchema
            }
        }
    }, async (request: FastifyRequest<UpdateBookRequest.Type>, reply) => {
        return bookController.updateBookHandler(request, reply)
    })
    
    instance.delete('/books/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Books'],
            summary: 'Delete book',
            params: DeleteBookRequest.Schema.shape.Params,
            response: {
                200: BookSchema
            }
        }
    }, async (request: FastifyRequest<DeleteBookRequest.Type>, reply) => {
        return bookController.deleteBookHandler(request, reply)
    })

}