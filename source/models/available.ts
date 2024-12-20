export namespace Available {
    export type Request = boolean
    export type DTO = boolean
    export type Response = Available
}

export class Available {

    private constructor (
        private available: boolean
    ) {}

    public static create(available: Available.Request): Available.Response {
        return new Available(available)
    }

    public static with(available: Available.DTO): Available.Response {
        return new Available(available)
    }

    public update(available: boolean): boolean {
        return this.available = available
    }

    public get value(): boolean {
        return this.available
    }

    public to(): Available.DTO {
        return this.value
    }

}