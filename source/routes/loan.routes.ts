import { FastifyTypedInstance } from '@configs/types'
import { loanController } from '@controllers/loan.controller'
import { authMiddleware } from '@middlewares/authentication.middleware'
import { AddBookToCartRequest, RemoveBookFromCartRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/users/me/cart/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Cart'],
            summary: 'Add book to cart',
            params: AddBookToCartRequest.Schema.shape.Params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    bookId: z.string(),
                    userId: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<AddBookToCartRequest.Type>, reply) => {
        return loanController.addBookToCartHandler(request, reply)
    })

    instance.get('/users/me/cart', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Cart'],
            summary: 'Get user cart',
            response: {
                200: z.array(
                    z.object({
                        createdAt: z.number(),
                        updatedAt: z.number(),
                        createdBy: z.string(),
                        coverImage: z.string().optional(),
                        subject: z.string(),
                        author: z.string(),
                        genre: z.string(),
                        title: z.string(),
                        isbn: z.string(),
                        id: z.string()
                    })
                )
            }
        }
    }, async (request: FastifyRequest, reply) => {
        return loanController.getBooksFromCartHandler(request, reply)
    })

    instance.delete('/users/me/cart', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Cart'],
            summary: 'Remove all books from cart',
            response: {
                200: z.array(
                    z.object({
                        createdAt: z.number(),
                        bookId: z.string(),
                        userId: z.string()
                    })
                )
            }
        }
    }, async (request: FastifyRequest, reply) => {
        return loanController.removeAllBooksFromCartHandler(request, reply)
    })

    instance.delete('/users/me/cart/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Cart'],
            summary: 'Remove book from cart',
            params: RemoveBookFromCartRequest.Schema.shape.Params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    bookId: z.string(),
                    userId: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<RemoveBookFromCartRequest.Type>, reply) => {
        return loanController.removeBookFromCartHandler(request, reply)
    })

}