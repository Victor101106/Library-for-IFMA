import { FastifyTypedInstance } from '@configs/types'
import { authController } from '@controllers'
import { authMiddleware } from '@middlewares/auth.middleware'
import { CompleteSignUpRequest, LogInWithGoogleCallbackRequest, LogInWithGoogleRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.get('/auth/signin/google/redirect', {
        schema: {
            tags: ['Authentication'],
            summary: 'Redirect to Google OAuth2 authentication page',
            response: {
                302: z.null()
            }
        }
    }, async (request, reply) => {
        return authController.redirectToGoogleAuthorizeURLHandler(request, reply)
    })

    instance.get('/auth/signin/google/callback', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate with Google OAuth2 callback in redirect URI',
            querystring: LogInWithGoogleCallbackRequest.Schema.shape.Querystring,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    googleId: z.string(),
                    picture: z.string(),
                    siape: z.number().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<LogInWithGoogleCallbackRequest.Type>, reply) => {
        return authController.logInWithGoogleCallbackHandler(request, reply)
    })

    instance.post('/auth/signin/google', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate with Google OAuth2 credential',
            body: LogInWithGoogleRequest.Schema.shape.Body,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    createdAt: z.number(),
                    updatedAt: z.number(),
                    googleId: z.string(),
                    picture: z.string(),
                    siape: z.number().optional(),
                    email: z.string(),
                    role: z.string(),
                    name: z.string(),
                    id: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<LogInWithGoogleRequest.Type>, reply) => {
        return authController.logInWithGoogleHandler(request, reply)
    })

    instance.post('/auth/signup/complete', {
        onRequest: [authMiddleware.ensureAuthenticationHandle],
        schema: {
            tags: ['Authentication'],
            summary: 'Complete user signup to purchase role',
            body: CompleteSignUpRequest.Schema.shape.Body,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    siape: z.number().optional(),
                    role: z.string()
                })
            }
        }
    }, async (request: FastifyRequest<CompleteSignUpRequest.Type>, reply) => {
        return authController.completeSignUpHandler(request, reply)
    })

    instance.get('/auth/logout', {
        schema: {
            tags: ['Authentication'],
            summary: 'Deauthenticate',
            response: {
                200: z.null()
            }
        }
    }, async (request, reply) => {
        return authController.logoutHandler(request, reply)
    })

}