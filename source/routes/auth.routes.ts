import { FastifyTypedInstance } from '@configs/types'
import { authController } from '@controllers'
import { authMiddleware } from '@middlewares/auth.middleware'
import { AuthenticateWithGoogleCallbackRequestSchemaByZod, AuthenticateWithGoogleRequestSchemaByZod, CompleteSignUpRequestSchemaByZod } from '@schemas/controllers/auth'
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
            querystring: AuthenticateWithGoogleCallbackRequestSchemaByZod.shape.query,
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
    }, async (request, reply) => {
        return authController.authenticateWithGoogleCallbackHandler(request, reply)
    })

    instance.post('/authenticate/google', {
        schema: {
            tags: ['Authentication'],
            summary: 'Authenticate with Google OAuth2 credential',
            body: AuthenticateWithGoogleRequestSchemaByZod.shape.body,
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
    }, async (request, reply) => {
        return authController.authenticateWithGoogleHandler(request, reply)
    })

    instance.post('/signup/complete', {
        onRequest: (request, reply) => authMiddleware.ensureAuthenticationHandle(request, reply),
        schema: {
            tags: ['Authentication'],
            summary: 'Complete user signup to purchase role',
            body: CompleteSignUpRequestSchemaByZod.shape.body,
            response: {
                200: z.object({
                    registration: z.string().optional(),
                    siape: z.number().optional(),
                    role: z.string()
                })
            }
        }
    }, async (request, reply) => {
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