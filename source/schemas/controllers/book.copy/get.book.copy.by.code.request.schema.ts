import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const GetBookCopyByCodeRequestSchemaByZod = z.object({
    params: z.object({
        code: z.coerce.number()
    })
})

export type GetBookCopyByCodeRequestSchemaType = z.infer<typeof GetBookCopyByCodeRequestSchemaByZod>

export class GetBookCopyByCodeRequestSchema extends Schema<GetBookCopyByCodeRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): GetBookCopyByCodeRequestSchema {
        return new GetBookCopyByCodeRequestSchema()
    }

    protected generateSchema(): ZodSchema<GetBookCopyByCodeRequestSchemaType> {
        return GetBookCopyByCodeRequestSchemaByZod
    }

}

export const getBookCopyByCodeRequestSchema = GetBookCopyByCodeRequestSchema.create()