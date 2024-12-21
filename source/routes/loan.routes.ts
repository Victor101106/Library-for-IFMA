import { FastifyTypedInstance } from '@configs/types'
import { loanController } from '@controllers/loan.controller'
import { authMiddleware } from '@middlewares/auth.middleware'
import { AddBookToCartRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.post('/loan/cart/:bookId', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Loan'],
            summary: 'Add book to cart',
            params: AddBookToCartRequest.Schema.shape.Params,
            response: {
                200: z.object({
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    bookId: z.string(),
                    userId: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<AddBookToCartRequest.Type>, reply) => {
        return loanController.addBookToCartHandler(request, reply)
    })

    instance.get('/loan/cart', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Loan'],
            summary: 'Get user cart',
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
    }, async (request: FastifyRequest, reply) => {
        return loanController.getCartHandler(request, reply)
    })

}