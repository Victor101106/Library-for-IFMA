import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidSiapeError } from './errors'

export namespace Siape {
    export type Request = number | undefined
    export type DTO = number | undefined
    export type Response = Siape
}

export class Siape {

    private constructor (
        private siape?: number
    ) {}

    public static create(siape: Siape.Request): Result<InvalidSiapeError, Siape.Response> {
        
        const isInvalidSiape = siape && !Siape.validate(siape)

        if (isInvalidSiape)
            return failure(new InvalidSiapeError(siape))
        
        return success(new Siape(siape))

    }

    public static with(siape: Siape.DTO): Siape.Response {
        return new Siape(siape)
    }

    public static validate(siape: number): boolean {
        return z.number().int().min(1000000).max(9999999).safeParse(siape).success
    }

    public update(siape: number): Result<InvalidSiapeError, number> {
        
        if (!Siape.validate(siape))
            return failure(new InvalidSiapeError(siape))

        return success(this.siape = siape)

    }

    public get value(): number | undefined {
        return this.siape
    }

    public to(): Siape.DTO {
        return this.value
    }

}