import { User } from '@models'

declare module 'fastify' {
    interface FastifyRequest {
        authentication: {
            userId: string
            user: User
        }
    }
}