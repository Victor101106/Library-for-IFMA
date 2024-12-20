import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const CreateBookCopyRequestSchemaByZod = z.object({
    body: z.object({
        available: z.boolean(),
        bookId: z.string(),
        code: z.number()
    }),
    locals: z.object({
        userId: z.string()
    })
})

export type CreateBookCopyRequestSchemaType = z.infer<typeof CreateBookCopyRequestSchemaByZod>

export class CreateBookCopyRequestSchema extends Schema<CreateBookCopyRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): CreateBookCopyRequestSchema {
        return new CreateBookCopyRequestSchema()
    }

    protected generateSchema(): ZodSchema<CreateBookCopyRequestSchemaType> {
        return CreateBookCopyRequestSchemaByZod
    }

}

export const createBookCopyRequestSchema = CreateBookCopyRequestSchema.create()