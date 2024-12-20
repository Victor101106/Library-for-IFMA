import { authController } from '@controllers'
import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {

    instance.get('/authenticate/google/redirect', (request, reply) => {
        return authController.redirectToGoogleAuthorizeURLHandler(request, reply)
    })

    instance.get('/authenticate/google/callback', (request, reply) => {
        return authController.authenticateWithGoogleCallbackHandler(request, reply)
    })

    instance.post('/authenticate/google', (request, reply) => {
        return authController.authenticateWithGoogleHandler(request, reply)
    })

    instance.get('/logout', (request, reply) => {
        return authController.logoutHandler(request, reply)
    })

}