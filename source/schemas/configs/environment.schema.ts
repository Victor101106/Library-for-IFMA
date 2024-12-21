import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export class EnvironmentSchema extends Schema<EnvironmentSchema.Type> {

    private constructor () {
        super()
    }

    public static create(): EnvironmentSchema {
        return new EnvironmentSchema()
    }

    protected generateSchema(): ZodSchema<EnvironmentSchema.Type> {
        return EnvironmentSchema.Schema
    }

}

export namespace EnvironmentSchema {
    
    export const Schema = z.object({
        ACCESS_TOKEN_SECRET_KEY: z.string(),
        GOOGLE_CLIENT_SECRET_KEY: z.string(),
        GOOGLE_REDIRECT_URI: z.string(),
        GOOGLE_CLIENT_ID: z.string(),
        PORT: z.number()
    })
    
    export type Type = z.infer<typeof Schema>

}

export const environmentSchema = EnvironmentSchema.create()