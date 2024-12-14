import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const ProfileRequestSchemaByZod = z.object({
    locals: z.object({
        userId: z.string()
    })
})

export type ProfileRequestSchemaType = z.infer<typeof ProfileRequestSchemaByZod>

export class ProfileRequestSchema extends Schema<ProfileRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): ProfileRequestSchema {
        return new ProfileRequestSchema()
    }

    protected generateSchema(): ZodSchema<ProfileRequestSchemaType> {
        return ProfileRequestSchemaByZod
    }

}

export const profileRequestSchema = ProfileRequestSchema.create()