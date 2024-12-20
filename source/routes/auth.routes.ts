import { FastifyTypedInstance } from '@configs/types'
import { authController } from '@controllers'
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
            querystring: z.object({
                code: z.string()
            }),
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
            body: z.object({
                credential: z.string()
            }),
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