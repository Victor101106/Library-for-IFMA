import { userController } from '@controllers'
import { authMiddleware } from '@middlewares'
import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {
    instance.get('/profile', {
        preHandler: (request, reply, done) => authMiddleware.ensureAuthenticationHandle(request, reply, done)
    },(request, reply) => {
        return userController.profileHandler(request, reply)
    })
}