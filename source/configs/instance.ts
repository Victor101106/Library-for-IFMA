import fastify from 'fastify'
import router from './router'
import statics from './statics'

const instance = fastify()

statics(instance)
router(instance)

export { instance }
