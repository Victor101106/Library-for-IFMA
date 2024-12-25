import { Environment } from '@schemas'

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Environment.Type {}
    }
}

Environment.Schema.parse(process.env)