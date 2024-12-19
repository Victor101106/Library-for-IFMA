export namespace Timestamp {
    export type Request = number | void
    export type DTO = number
    export type Response = Timestamp
}

export class Timestamp {

    private constructor (
        private timestamp: Date
    ) {}

    public static create(timestamp: Timestamp.Request): Timestamp.Response {
        return new Timestamp(timestamp ? new Date(timestamp) : new Date())
    }

    public static with(timestamp: Timestamp.DTO): Timestamp.Response {
        return new Timestamp(new Date(timestamp))
    }

    public update(timestamp: Date): Date {
        return this.timestamp = timestamp
    }

    public get value(): Date {
        return this.timestamp
    }

    public to(): Timestamp.DTO {
        return this.value.getTime()
    }

}