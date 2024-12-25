import fastify from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import decorators from './decorators'
import engine from './engine'
import formbody from './formbody'
import router from './router'
import statics from './statics'
import swagger from './swagger'

const instance = fastify().withTypeProvider<ZodTypeProvider>()

decorators(instance)
formbody(instance)
statics(instance)
engine(instance)
swagger(instance)
router(instance)

export { instance }

