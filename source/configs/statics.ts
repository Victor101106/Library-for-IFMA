import { FastifyTypedInstance } from '@configs/types'
import FastifyStatic from '@fastify/static'
import path from 'path'

export default (instance: FastifyTypedInstance): void => {
    instance.register(FastifyStatic, {
        root: path.join(__dirname, '../../public/'),
        prefix: '/public/'
    })
}