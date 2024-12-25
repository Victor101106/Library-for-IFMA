export namespace OptionalId {
    export type Request = string | undefined
    export type DTO = string | undefined
    export type Response = OptionalId
}

export class OptionalId {

    private constructor (
        private id: string | undefined
    ) {}

    public static create(id: OptionalId.Request): OptionalId.Response {
        return new OptionalId(id)
    }

    public static with(id: OptionalId.DTO): OptionalId.Response {
        return new OptionalId(id)
    }

    public update(id: string | undefined): string | undefined {
        return this.id = id
    }

    public get value(): string | undefined {
        return this.id
    }

    public to(): OptionalId.DTO {
        return this.id
    }

}