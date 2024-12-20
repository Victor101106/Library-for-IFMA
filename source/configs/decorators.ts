import { FastifyTypedInstance } from '@configs/types'

declare module 'fastify' {
    interface FastifyRequest {
        locals: Object
    }
}

export default (instance: FastifyTypedInstance) => {
    instance.decorateRequest('locals')
}