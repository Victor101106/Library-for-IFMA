import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const CompleteSignUpRequestSchemaByZod = z.object({
    body: z.union([
        z.object({
            registration: z.void(),
            siape: z.number()
        }),
        z.object({
            registration: z.string(),
            siape: z.void()
        })
    ]),
    locals: z.object({
        userId: z.string()
    })
})

export type CompleteSignUpRequestSchemaType = z.infer<typeof CompleteSignUpRequestSchemaByZod>

export class CompleteSignUpRequestSchema extends Schema<CompleteSignUpRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): CompleteSignUpRequestSchema {
        return new CompleteSignUpRequestSchema()
    }

    protected generateSchema(): ZodSchema<CompleteSignUpRequestSchemaType> {
        return CompleteSignUpRequestSchemaByZod
    }

}

export const completeSignUpRequestSchema = CompleteSignUpRequestSchema.create()