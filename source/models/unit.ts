import { failure, Result, success } from '@helpers'
import { Available } from './available'
import { Code, Id, Timestamp } from './index'

export namespace Unit {
    
    export type Request = {
        available: boolean
        createdBy: string
        bookId   : string
        code     : number
    }
    
    export type DTO = Request & {
        createdAt: number
        updatedAt: number
    }
    
    export type Response = Unit

    export namespace Update {
        export type Request = {
            available?: boolean | void
        }
        export type Response = Unit
    }

}

export class Unit {

    private constructor (
        public readonly createdAt: Timestamp,
        public readonly updatedAt: Timestamp,
        public readonly available: Available,
        public readonly createdBy: Id,
        public readonly bookId   : Id,
        public readonly code     : Code
    ) {}

    public static create(request: Unit.Request): Result<Error, Unit.Response> {

        const codeResult = Code.create(request.code)
        
        if (codeResult.failed())
            return failure(codeResult.value)

        const code = codeResult.value
        
        const createdAt = Timestamp.create()
        const updatedAt = Timestamp.create()

        const available = Available.create(request.available)

        const createdBy = Id.create(request.createdBy)
        const bookId    = Id.create(request.bookId)
        
        return success(new Unit(createdAt, updatedAt, available, createdBy, bookId, code))

    }

    public static with(data: Unit.DTO): Unit.Response {
        
        const createdAt = Timestamp.with(data.createdAt)
        const updatedAt = Timestamp.with(data.updatedAt)
        const available = Available.with(data.available)
        const createdBy = Id       .with(data.createdBy)
        const bookId    = Id       .with(data.bookId)
        const code      = Code     .with(data.code)
        
        return new Unit(createdAt, updatedAt, available, createdBy, bookId, code)

    }

    public update(request: Unit.Update.Request): Result<Error, Unit.Update.Response> {

        if (typeof request.available === 'boolean')
            this.available.update(request.available)

        this.updatedAt.update(new Date())

        return success(this)

    }

    public to(): Unit.DTO {

        const createdAt = this.createdAt.to()
        const updatedAt = this.updatedAt.to()
        const available = this.available.to()
        const createdBy = this.createdBy.to()
        const bookId    = this.bookId   .to()
        const code      = this.code     .to()

        return { createdAt, updatedAt, available, createdBy, bookId, code }

    }

}