import { environment } from '@configs'
import { authMiddleware } from '@middlewares'
import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {
    instance.get('/', {
        preHandler: (request, reply, done) => authMiddleware.denyAuthenticationHandle(request, reply, done)
    }, (request, reply) => {
        return reply.view('temporary.home.html', {
            GOOGLE_REDIRECT_URI: environment.GOOGLE_REDIRECT_URI,
            GOOGLE_CLIENT_ID: environment.GOOGLE_CLIENT_ID
        })
    })
}