import { FastifyTypedInstance } from '@configs/types'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

export default (instance: FastifyTypedInstance): void => {

    instance.setValidatorCompiler(validatorCompiler)
    
    instance.setSerializerCompiler(serializerCompiler)

    instance.register(fastifySwagger, {
        openapi: {
            info: {
                description: 'Web application for management and access control to the library of Instituto Federal do Maranhão - Campus Avançado Porto Franco.',
                title: 'Library for IFMA',
                version: '0.0.1'
            }
        },
        transform: jsonSchemaTransform
    })

    instance.register(fastifySwaggerUi, {
        routePrefix: '/documentation'
    })

}