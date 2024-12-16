import { authController } from '@controllers'
import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {
    
    instance.post('/signup/google/callback', (request, reply) => {
        return authController.callbackHandler(request, reply)
    })
    
    instance.get('/logout', (request, reply) => {
        return authController.logoutHandler(request, reply)
    })

}