import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export class EnsureAuthenticationRequestSchema extends Schema<EnsureAuthenticationRequestSchema.Type> {

    private constructor () {
        super()
    }

    public static create(): EnsureAuthenticationRequestSchema {
        return new EnsureAuthenticationRequestSchema()
    }

    protected generateSchema(): ZodSchema<EnsureAuthenticationRequestSchema.Type> {
        return EnsureAuthenticationRequestSchema.Schema
    }

}

export namespace EnsureAuthenticationRequestSchema {
    
    export const Schema = z.object({
        headers: z.object({
            cookie: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export const ensureAuthenticationRequestSchema = EnsureAuthenticationRequestSchema.create()