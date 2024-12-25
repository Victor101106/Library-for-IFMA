import { FastifyTypedInstance } from '@configs'
import fastifyFormbody from '@fastify/formbody'

export default (instance: FastifyTypedInstance): void => {
    instance.register(fastifyFormbody)
}