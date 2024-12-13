import FastifyView from '@fastify/view'
import { FastifyInstance } from 'fastify'

export default (instance: FastifyInstance) => {
    instance.register(FastifyView, { 
        engine: { ejs: require('ejs') },
        root: './source/views/'
    })
}