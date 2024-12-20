import { FastifyTypedInstance } from '@configs/types'
import FastifyView from '@fastify/view'

export default (instance: FastifyTypedInstance) => {
    instance.register(FastifyView, { 
        engine: { ejs: require('ejs') },
        root: './source/views/'
    })
}