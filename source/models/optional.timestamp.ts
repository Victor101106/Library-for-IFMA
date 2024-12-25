export namespace OptionalTimestamp {
    export type Request = number | undefined
    export type DTO = number | undefined
    export type Response = OptionalTimestamp
}

export class OptionalTimestamp {

    private constructor (
        private timestamp: Date | undefined
    ) {}

    public static create(timestamp: OptionalTimestamp.Request): OptionalTimestamp.Response {
        return new OptionalTimestamp(timestamp ? new Date(timestamp) : undefined)
    }

    public static with(timestamp: OptionalTimestamp.DTO): OptionalTimestamp.Response {
        return new OptionalTimestamp(timestamp ? new Date(timestamp) : undefined)
    }

    public update(timestamp: number | undefined): Date | undefined {
        return this.timestamp = timestamp ? new Date(timestamp) : undefined
    }

    public get value(): Date | undefined {
        return this.timestamp
    }

    public to(): OptionalTimestamp.DTO {
        return this.value?.getTime()
    }

}