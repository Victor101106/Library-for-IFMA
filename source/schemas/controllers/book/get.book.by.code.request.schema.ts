import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const GetBookByCodeRequestSchemaByZod = z.object({
    params: z.object({
        code: z.coerce.number()
    })
})

export type GetBookByCodeRequestSchemaType = z.infer<typeof GetBookByCodeRequestSchemaByZod>

export class GetBookByCodeRequestSchema extends Schema<GetBookByCodeRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): GetBookByCodeRequestSchema {
        return new GetBookByCodeRequestSchema()
    }

    protected generateSchema(): ZodSchema<GetBookByCodeRequestSchemaType> {
        return GetBookByCodeRequestSchemaByZod
    }

}

export const getBookByCodeRequestSchema = GetBookByCodeRequestSchema.create()