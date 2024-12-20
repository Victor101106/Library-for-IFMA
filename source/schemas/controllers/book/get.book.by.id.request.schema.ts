import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const GetBookByIdRequestSchemaByZod = z.object({
    params: z.object({
        id: z.string()
    })
})

export type GetBookByIdRequestSchemaType = z.infer<typeof GetBookByIdRequestSchemaByZod>

export class GetBookByIdRequestSchema extends Schema<GetBookByIdRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): GetBookByIdRequestSchema {
        return new GetBookByIdRequestSchema()
    }

    protected generateSchema(): ZodSchema<GetBookByIdRequestSchemaType> {
        return GetBookByIdRequestSchemaByZod
    }

}

export const getBookByIdRequestSchema = GetBookByIdRequestSchema.create()