import fastifyFormbody from '@fastify/formbody'
import { FastifyInstance } from 'fastify'

export default (instance: FastifyInstance): void => {
    instance.register(fastifyFormbody)
}