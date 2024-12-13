import fastify from 'fastify'
import router from './router'

const instance = fastify()

router(instance)

export { instance }
