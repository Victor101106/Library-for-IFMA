import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const UpdateBookRequestSchemaByZod = z.object({
    body: z.object({
        stockCount: z.number().optional(),
        picture: z.string().url().optional(),
        subject: z.string().optional(),
        author: z.string().optional(),
        genre: z.string().optional(),
        title: z.string().optional()
    }),
    params: z.object({
        code: z.coerce.number()
    })
})

export type UpdateBookRequestSchemaType = z.infer<typeof UpdateBookRequestSchemaByZod>

export class UpdateBookRequestSchema extends Schema<UpdateBookRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): UpdateBookRequestSchema {
        return new UpdateBookRequestSchema()
    }

    protected generateSchema(): ZodSchema<UpdateBookRequestSchemaType> {
        return UpdateBookRequestSchemaByZod
    }

}

export const updateBookRequestSchema = UpdateBookRequestSchema.create()