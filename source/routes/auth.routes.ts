import { environment } from '@configs'
import { authController } from '@controllers'
import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {
    
    instance.post(environment.GOOGLE_REDIRECT_URI_ENDPOINT, (request, reply) => {
        return authController.callbackHandler(request, reply)
    })   
    
    instance.get('/logout', (request, reply) => {
        return authController.logoutHandler(request, reply)
    })

}