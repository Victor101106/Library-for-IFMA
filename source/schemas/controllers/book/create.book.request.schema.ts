import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const CreateBookRequestSchemaByZod = z.object({
    body: z.object({
        stockCount: z.number(),
        picture: z.string().url().optional(),
        subject: z.string(),
        author: z.string(),
        genre: z.string(),
        title: z.string(),
        code: z.number()
    }),
    locals: z.object({
        userId: z.string()
    })
})

export type CreateBookRequestSchemaType = z.infer<typeof CreateBookRequestSchemaByZod>

export class CreateBookRequestSchema extends Schema<CreateBookRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): CreateBookRequestSchema {
        return new CreateBookRequestSchema()
    }

    protected generateSchema(): ZodSchema<CreateBookRequestSchemaType> {
        return CreateBookRequestSchemaByZod
    }

}

export const createBookRequestSchema = CreateBookRequestSchema.create()