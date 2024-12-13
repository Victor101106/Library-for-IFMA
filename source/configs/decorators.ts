import { FastifyInstance } from 'fastify'

declare module 'fastify' {
    interface FastifyRequest {
        locals: Object
    }
}

export default (instance: FastifyInstance) => {
    instance.decorateRequest('locals')
}