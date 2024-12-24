import { FastifyTypedInstance } from '@configs/types'
import { authenticationController } from '@controllers'
import { authMiddleware } from '@middlewares/authentication.middleware'
import { CompleteSignUpRequest, LogInWithGoogleCallbackRequest, LogInWithGoogleRequest } from '@schemas/controllers'
import { UserSchema } from '@schemas/models'
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
        return authenticationController.redirectToGoogleAuthorizeURLHandler(request, reply)
    })

    instance.get('/auth/signin/google/callback', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate with Google OAuth2 callback in redirect URI',
            querystring: LogInWithGoogleCallbackRequest.Schema.shape.Querystring,
            response: {
                200: UserSchema
            }
        }
    }, async (request: FastifyRequest<LogInWithGoogleCallbackRequest.Type>, reply) => {
        return authenticationController.logInWithGoogleCallbackHandler(request, reply)
    })

    instance.post('/auth/signin/google', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate with Google OAuth2 credential',
            body: LogInWithGoogleRequest.Schema.shape.Body,
            response: {
                200: UserSchema
            }
        }
    }, async (request: FastifyRequest<LogInWithGoogleRequest.Type>, reply) => {
        return authenticationController.logInWithGoogleHandler(request, reply)
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
        return authenticationController.completeSignUpHandler(request, reply)
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
        return authenticationController.logoutHandler(request, reply)
    })

}