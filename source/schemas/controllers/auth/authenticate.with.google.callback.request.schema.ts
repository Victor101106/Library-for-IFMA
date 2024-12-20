import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const AuthenticateWithGoogleCallbackRequestSchemaByZod = z.object({
    query: z.object({
        code: z.string()
    })
})

export type AuthenticateWithGoogleCallbackRequestSchemaType = z.infer<typeof AuthenticateWithGoogleCallbackRequestSchemaByZod>

export class AuthenticateWithGoogleCallbackRequestSchema extends Schema<AuthenticateWithGoogleCallbackRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): AuthenticateWithGoogleCallbackRequestSchema {
        return new AuthenticateWithGoogleCallbackRequestSchema()
    }

    protected generateSchema(): ZodSchema<AuthenticateWithGoogleCallbackRequestSchemaType> {
        return AuthenticateWithGoogleCallbackRequestSchemaByZod
    }

}

export const authenticateWithGoogleCallbackRequestSchema = AuthenticateWithGoogleCallbackRequestSchema.create()