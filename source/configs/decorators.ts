import { FastifyTypedInstance } from '@configs/types'

declare module 'fastify' {
    interface FastifyRequest {
        locals: Record<string, unknown>
    }
}

export default (instance: FastifyTypedInstance) => {
    instance.decorateRequest('locals')
}