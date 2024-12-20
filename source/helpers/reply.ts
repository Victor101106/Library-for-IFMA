import { FastifyReply } from 'fastify'
import { ACCESS_TOKEN_COOKIE, serializeCookie } from './cookie'
import { UnauthorizedError } from './errors'

export function ok(reply: FastifyReply, payload?: unknown): FastifyReply {
    return reply.status(200).send(payload)
}

export function created(reply: FastifyReply, payload?: unknown): FastifyReply {
    return reply.status(201).send(payload)
}

export function badRequest(reply: FastifyReply, error: Error): FastifyReply {
    return reply.status(400).send(error)
}

export function unauthorized(reply: FastifyReply, error?: Error): FastifyReply {

    reply.header('set-cookie', serializeCookie(ACCESS_TOKEN_COOKIE, ''))
    reply.status(401)
    reply.send(new UnauthorizedError(error?.message))

    return reply

}