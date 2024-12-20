import { FastifyTypedInstance } from '@configs/types'
import fastifyFormbody from '@fastify/formbody'

export default (instance: FastifyTypedInstance): void => {
    instance.register(fastifyFormbody)
}