import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const DeleteBookCopyByCodeRequestSchemaByZod = z.object({
    params: z.object({
        code: z.coerce.number()
    })
})

export type DeleteBookCopyByCodeRequestSchemaType = z.infer<typeof DeleteBookCopyByCodeRequestSchemaByZod>

export class DeleteBookCopyByCodeRequestSchema extends Schema<DeleteBookCopyByCodeRequestSchemaType> {

    private constructor () {
        super()
    }

    public static create(): DeleteBookCopyByCodeRequestSchema {
        return new DeleteBookCopyByCodeRequestSchema()
    }

    protected generateSchema(): ZodSchema<DeleteBookCopyByCodeRequestSchemaType> {
        return DeleteBookCopyByCodeRequestSchemaByZod
    }

}

export const deleteBookCopyByCodeRequestSchema = DeleteBookCopyByCodeRequestSchema.create()