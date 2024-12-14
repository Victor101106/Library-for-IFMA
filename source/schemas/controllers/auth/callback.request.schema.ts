import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const CallbackRequestSchemaByZod = z.object({
    body: z.object({
        credential: z.string()
    })
})

export type CallbackRequestSchemaType = z.infer<typeof CallbackRequestSchemaByZod>

export class CallbackRequestSchema extends Schema<CallbackRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): CallbackRequestSchema {
        return new CallbackRequestSchema()
    }

    protected generateSchema(): ZodSchema<CallbackRequestSchemaType> {
        return CallbackRequestSchemaByZod
    }

}

export const callbackRequestSchema = CallbackRequestSchema.create()