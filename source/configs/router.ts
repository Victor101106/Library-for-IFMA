import { FastifyInstance } from 'fastify'
import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

export default (instance: FastifyInstance): void => {
    
    const routesFolderPath = join(__dirname, '../routes/')

    if (existsSync(routesFolderPath))
        readdirSync(routesFolderPath).forEach(file => instance.register(require(`${routesFolderPath}/${file}`)))
    
}