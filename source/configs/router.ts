import { FastifyTypedInstance } from '@configs'
import { existsSync, readdirSync } from 'fs'
import { join } from 'path'

export default (instance: FastifyTypedInstance): void => {
    
    const routesFolderPath = join(__dirname, '../routes/')

    if (existsSync(routesFolderPath))
        readdirSync(routesFolderPath).forEach(file => instance.register(require(`${routesFolderPath}/${file}`)))
    
}