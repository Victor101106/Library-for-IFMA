import { environment } from '@configs'
import { FastifyTypedInstance } from '@configs/types'
import { z } from 'zod'

module.exports = (instance: FastifyTypedInstance) => {
    instance.get('/', {
        schema: {
            tags: ['View'],
            summary: 'Test view of the Sign in with Google button',
            response: {
                200: z.string()
            }
        }
    }, async (request, reply) => {
        return reply.view('home.test.html', {
            GOOGLE_CLIENT_ID: environment.GOOGLE_CLIENT_ID
        })
    })
}