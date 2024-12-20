import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const DeleteBookRequestSchemaByZod = z.object({
    params: z.object({
        code: z.coerce.number()
    })
})

export type DeleteBookRequestSchemaType = z.infer<typeof DeleteBookRequestSchemaByZod>

export class DeleteBookRequestSchema extends Schema<DeleteBookRequestSchemaType> {

    private constructor () {
        super()
    }

    public static delete(): DeleteBookRequestSchema {
        return new DeleteBookRequestSchema()
    }

    protected generateSchema(): ZodSchema<DeleteBookRequestSchemaType> {
        return DeleteBookRequestSchemaByZod
    }

}

export const deleteBookRequestSchema = DeleteBookRequestSchema.delete()