import { FastifyTypedInstance } from '@configs'
import { loanController } from '@controllers'
import { authMiddleware } from '@middlewares'
import { AddBookToCartRequest, BookSchema, CartItemSchema, RemoveBookFromCartRequest } from '@schemas'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/users/me/cart/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandler],
        schema: {
            tags: ['Cart'],
            summary: 'Add book to cart',
            params: AddBookToCartRequest.Schema.shape.Params,
            response: {
                200: CartItemSchema
            }
        }
    }, async (request: FastifyRequest<AddBookToCartRequest.Type>, reply) => {
        return loanController.addBookToCartHandler(request, reply)
    })

    instance.get('/users/me/cart', {
        onRequest: [authMiddleware.ensureAuthenticationHandler],
        schema: {
            tags: ['Cart'],
            summary: 'Get user cart',
            response: {
                200: z.array(BookSchema)
            }
        }
    }, async (request: FastifyRequest, reply) => {
        return loanController.getBooksFromCartHandler(request, reply)
    })

    instance.delete('/users/me/cart', {
        onRequest: [authMiddleware.ensureAuthenticationHandler],
        schema: {
            tags: ['Cart'],
            summary: 'Remove all books from cart',
            response: {
                200: z.array(CartItemSchema)
            }
        }
    }, async (request: FastifyRequest, reply) => {
        return loanController.removeAllBooksFromCartHandler(request, reply)
    })

    instance.delete('/users/me/cart/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandler],
        schema: {
            tags: ['Cart'],
            summary: 'Remove book from cart',
            params: RemoveBookFromCartRequest.Schema.shape.Params,
            response: {
                200: CartItemSchema
            }
        }
    }, async (request: FastifyRequest<RemoveBookFromCartRequest.Type>, reply) => {
        return loanController.removeBookFromCartHandler(request, reply)
    })

}