import { FastifyTypedInstance } from '@configs/types'
import { authController } from '@controllers'
import { authMiddleware } from '@middlewares/auth.middleware'
import { AuthenticateWithGoogleCallbackRequest, AuthenticateWithGoogleRequest, CompleteSignUpRequest } from '@schemas/controllers'
import { FastifyRequest } from 'fastify'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {

    instance.get('/authenticate/google/redirect', {
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

    instance.get('/authenticate/google/callback', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate with Google OAuth2 callback in redirect URI',
            querystring: AuthenticateWithGoogleCallbackRequest.Schema.shape.Querystring,
            response: {
                200: z.object({
                    users: z.object({
                        picture: z.string(),
                        email: z.string(),
                        name: z.string(),
                        id: z.string()
                    })
                })
            }
        }
    }, async (request: FastifyRequest<AuthenticateWithGoogleCallbackRequest.Type>, reply) => {
        return authController.authenticateWithGoogleCallbackHandler(request, reply)
    })

    instance.post('/authenticate/google', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate with Google OAuth2 credential',
            body: AuthenticateWithGoogleRequest.Schema.shape.Body,
            response: {
                200: z.object({
                    user: z.object({
                        picture: z.string(),
                        email: z.string(),
                        name: z.string(),
                        id: z.string()
                    })
                })
            }
        }
    }, async (request: FastifyRequest<AuthenticateWithGoogleRequest.Type>, reply) => {
        return authController.authenticateWithGoogleHandler(request, reply)
    })

    instance.post('/signup/complete', {
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

    instance.get('/logout', {
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