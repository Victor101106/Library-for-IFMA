import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export class AccessTokenPayloadSchema extends Schema<AccessTokenPayloadSchema.Type> {

    private constructor () {
        super()
    }

    public static create(): AccessTokenPayloadSchema {
        return new AccessTokenPayloadSchema()
    }

    protected generateSchema(): ZodSchema<AccessTokenPayloadSchema.Type> {
        return AccessTokenPayloadSchema.Schema
    }

}

export namespace AccessTokenPayloadSchema {
    
    export const Schema = z.object({
        sub: z.string()
    })
    
    export type Type = z.infer<typeof Schema>

}

export const accessTokenPayloadSchema = AccessTokenPayloadSchema.create()