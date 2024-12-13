import { environment } from '@configs'
import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {
    instance.get('/', (request, reply) => {
        return reply.view('temporary.home.html', {
            GOOGLE_REDIRECT_URI: environment.GOOGLE_REDIRECT_URI,
            GOOGLE_CLIENT_ID: environment.GOOGLE_CLIENT_ID
        })
    })
}