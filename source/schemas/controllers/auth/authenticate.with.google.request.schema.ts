import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const AuthenticateWithGoogleRequestSchemaByZod = z.object({
    body: z.object({
        credential: z.string()
    })
})

export type AuthenticateWithGoogleRequestSchemaType = z.infer<typeof AuthenticateWithGoogleRequestSchemaByZod>

export class AuthenticateWithGoogleRequestSchema extends Schema<AuthenticateWithGoogleRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): AuthenticateWithGoogleRequestSchema {
        return new AuthenticateWithGoogleRequestSchema()
    }

    protected generateSchema(): ZodSchema<AuthenticateWithGoogleRequestSchemaType> {
        return AuthenticateWithGoogleRequestSchemaByZod
    }

}

export const authenticateWithGoogleRequestSchema = AuthenticateWithGoogleRequestSchema.create()