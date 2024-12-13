import { Schema } from '@schemas'
import { z, ZodSchema } from 'zod'

export const EnvironmentSchemaByZod = z.object({
    PORT: z.number()
})

export type EnvironmentSchemaType = z.infer<typeof EnvironmentSchemaByZod>

export class EnvironmentSchema extends Schema<EnvironmentSchemaType> {

    private constructor () {
        super()
    }

    public static create(): EnvironmentSchema {
        return new EnvironmentSchema()
    }

    protected generateSchema(): ZodSchema<EnvironmentSchemaType> {
        return EnvironmentSchemaByZod
    }

}

export const environmentSchema = EnvironmentSchema.create()