import { FastifyInstance } from 'fastify'

module.exports = (instance: FastifyInstance) => {
    instance.get('/profile', (request, reply) => {
        return reply.view('user/temporary.profile.html', {
            picture: 'picture-url',
            email: 'john@doe.com',
            name: 'John Doe'
        })
    })
}