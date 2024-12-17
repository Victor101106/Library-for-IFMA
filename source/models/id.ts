import { v4 as uuidv4 } from 'uuid'

export namespace Id {
    export type Request = void
    export type DTO = string
    export type Response = Id
}

export class Id {

    private constructor (
        public readonly value: string
    ) {}

    public static create(): Id.Response {
        return new Id(uuidv4())
    }

    public static with(id: Id.DTO): Id.Response {
        return new Id(id)
    }

}