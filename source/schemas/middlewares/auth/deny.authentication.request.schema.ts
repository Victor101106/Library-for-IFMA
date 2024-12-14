import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const DenyAuthenticationRequestSchemaByZod = z.object({
    headers: z.object({
        cookie: z.string().optional()
    })
})

export type DenyAuthenticationRequestSchemaType = z.infer<typeof DenyAuthenticationRequestSchemaByZod>

export class DenyAuthenticationRequestSchema extends Schema<DenyAuthenticationRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): DenyAuthenticationRequestSchema {
        return new DenyAuthenticationRequestSchema()
    }

    protected generateSchema(): ZodSchema<DenyAuthenticationRequestSchemaType> {
        return DenyAuthenticationRequestSchemaByZod
    }

}

export const denyAuthenticationRequestSchema = DenyAuthenticationRequestSchema.create()