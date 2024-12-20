import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const AccessTokenPayloadSchemaByZod = z.object({
    sub: z.string()
})

export type AccessTokenPayloadSchemaType = z.infer<typeof AccessTokenPayloadSchemaByZod>

export class AccessTokenPayloadSchema extends Schema<AccessTokenPayloadSchemaType> {

    private constructor () {
        super()
    }

    public static create(): AccessTokenPayloadSchema {
        return new AccessTokenPayloadSchema()
    }

    protected generateSchema(): ZodSchema<AccessTokenPayloadSchemaType> {
        return AccessTokenPayloadSchemaByZod
    }

}

export const accessTokenPayloadSchema = AccessTokenPayloadSchema.create()