import { v4 as uuidv4 } from 'uuid'

export namespace Id {
    export type Request = string | void
    export type DTO = string
    export type Response = Id
}

export class Id {

    private constructor (
        public readonly value: string
    ) {}

    public static create(id: Id.Request): Id.Response {
        return new Id(id || uuidv4())
    }

    public static with(id: Id.DTO): Id.Response {
        return new Id(id)
    }

    public to(): Id.DTO {
        return this.value
    }

}