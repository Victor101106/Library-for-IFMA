import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const EnsureAuthenticationRequestSchemaByZod = z.object({
    headers: z.object({
        cookie: z.string()
    })
})

export type EnsureAuthenticationRequestSchemaType = z.infer<typeof EnsureAuthenticationRequestSchemaByZod>

export class EnsureAuthenticationRequestSchema extends Schema<EnsureAuthenticationRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): EnsureAuthenticationRequestSchema {
        return new EnsureAuthenticationRequestSchema()
    }

    protected generateSchema(): ZodSchema<EnsureAuthenticationRequestSchemaType> {
        return EnsureAuthenticationRequestSchemaByZod
    }

}

export const ensureAuthenticationRequestSchema = EnsureAuthenticationRequestSchema.create()