import { environment } from '@configs'
import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {
    instance.get('/', (request, reply) => {
        return reply.view('home.test.html', {
            GOOGLE_CLIENT_ID: environment.GOOGLE_CLIENT_ID
        })
    })
}