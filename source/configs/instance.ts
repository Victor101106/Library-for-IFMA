import fastify from 'fastify'
import engine from './engine'
import router from './router'
import statics from './statics'

const instance = fastify()

statics(instance)
engine(instance)
router(instance)

export { instance }
