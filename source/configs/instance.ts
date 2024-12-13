import fastify from 'fastify'
import engine from './engine'
import formbody from './formbody'
import router from './router'
import statics from './statics'

const instance = fastify()

formbody(instance)
statics(instance)
engine(instance)
router(instance)

export { instance }
