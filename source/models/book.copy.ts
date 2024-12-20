import { failure, Result, success } from '@helpers'
import { Available } from './available'
import { Code, Id, Timestamp } from './index'

export namespace BookCopy {
    export type Request = {
        available: boolean
        createdBy: string
        bookId   : string
        code     : number
    }
    export type DTO = Request & {
        createdAt: number
        updatedAt: number
        id       : string
    }
    export type Response = BookCopy
}

export class BookCopy {

    private constructor (
        public readonly createdAt: Timestamp,
        public readonly updatedAt: Timestamp,
        public readonly available: Available,
        public readonly createdBy: Id,
        public readonly bookId   : Id,
        public readonly code     : Code,
        public readonly id       : Id
    ) {}

    public static create(request: BookCopy.Request): Result<Error, BookCopy.Response> {

        const codeResult = Code.create(request.code)
        
        if (codeResult.failed())
            return failure(codeResult.value)

        const code = codeResult.value
        
        const createdAt = Timestamp.create()
        const updatedAt = Timestamp.create()

        const available = Available.create(request.available)

        const createdBy = Id.create(request.createdBy)
        const bookId    = Id.create(request.bookId)
        const id        = Id.create()
        
        return success(new BookCopy(createdAt, updatedAt, available, createdBy, bookId, code, id))

    }

    public static with(data: BookCopy.DTO): BookCopy.Response {
        
        const createdAt = Timestamp.with(data.createdAt)
        const updatedAt = Timestamp.with(data.updatedAt)
        const available = Available.with(data.available)
        const createdBy = Id       .with(data.createdBy)
        const bookId    = Id       .with(data.bookId)
        const code      = Code     .with(data.code)
        const id        = Id       .with(data.id)
        
        return new BookCopy(createdAt, updatedAt, available, createdBy, bookId, code, id)

    }

    public to(): BookCopy.DTO {

        const createdAt = this.createdAt.to()
        const updatedAt = this.updatedAt.to()
        const available = this.available.to()
        const createdBy = this.createdBy.to()
        const bookId    = this.bookId   .to()
        const code      = this.code     .to()
        const id        = this.id       .to()

        return { createdAt, updatedAt, available, createdBy, bookId, code, id }

    }

}