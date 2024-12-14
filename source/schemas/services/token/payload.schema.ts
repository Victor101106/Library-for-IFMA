import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const PayloadSchemaByZod = z.object({
    sub: z.string()
})

export type PayloadSchemaType = z.infer<typeof PayloadSchemaByZod>

export class PayloadSchema extends Schema<PayloadSchemaType> {

    private constructor () {
        super()
    }

    public static create(): PayloadSchema {
        return new PayloadSchema()
    }

    protected generateSchema(): ZodSchema<PayloadSchemaType> {
        return PayloadSchemaByZod
    }

}

export const payloadSchema = PayloadSchema.create()