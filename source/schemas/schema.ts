import { failure, Result, success } from '@helpers'
import { ZodSchema } from 'zod'

export abstract class Schema<T> {

    protected abstract generateSchema(): ZodSchema<T>

    validate(request: unknown): T {

        const schema = this.generateSchema()
        const parse = schema.parse(request)

        return parse

    }

    validateSafe(request: unknown): Result<Error, T> {

        const schema = this.generateSchema()
        const parse = schema.safeParse(request)

        if (parse.error)
            return failure(parse.error)

        return success(parse.data)

    }

}