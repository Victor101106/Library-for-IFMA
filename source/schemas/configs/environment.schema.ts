import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const EnvironmentSchemaByZod = z.object({
    GOOGLE_REDIRECT_URI_ENDPOINT: z.string(),
    GOOGLE_CLIENT_SECRET_KEY: z.string(),
    GOOGLE_REDIRECT_URI: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    ACCESS_TOKEN_SECRET_KEY: z.string(),
    PORT: z.number()
})

export type EnvironmentSchemaType = z.infer<typeof EnvironmentSchemaByZod>

export class EnvironmentSchema extends Schema<EnvironmentSchemaType> {

    private constructor () {
        super()
    }

    public static create(): EnvironmentSchema {
        return new EnvironmentSchema()
    }

    protected generateSchema(): ZodSchema<EnvironmentSchemaType> {
        return EnvironmentSchemaByZod
    }

}

export const environmentSchema = EnvironmentSchema.create()