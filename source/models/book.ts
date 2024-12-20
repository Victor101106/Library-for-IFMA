import { failure, Result, success } from '@helpers'
import { Code } from './code'
import { Attribute, Id, Picture, StockCount, Timestamp } from './index'

export namespace Book {
    export type Request = {
        stockCount: number
        createdBy : string
        picture  ?: string
        subject   : string
        author    : string
        genre     : string
        title     : string
        code      : number
    }
    export type DTO = Request & {
        createdAt: number
        updatedAt: number
        id       : string
    }
    export type Response = Book
}

export class Book {

    private constructor (
        public readonly createdAt : Timestamp,
        public readonly updatedAt : Timestamp,
        public readonly stockCount: StockCount,
        public readonly createdBy : Id,
        public readonly picture   : Picture,
        public readonly subject   : Attribute,
        public readonly author    : Attribute,
        public readonly genre     : Attribute,
        public readonly title     : Attribute,
        public readonly code      : Code,
        public readonly id        : Id
    ) {}

    public static create(request: Book.Request): Result<Error, Book.Response> {

        const stockCountResult = StockCount.create(request.stockCount)
        const pictureResult    = Picture   .create(request.picture)
        const subjectResult    = Attribute .create(request.subject)
        const authorResult     = Attribute .create(request.author)
        const genreResult      = Attribute .create(request.genre)
        const titleResult      = Attribute .create(request.title)
        const codeResult       = Code      .create(request.code)
        
        if (stockCountResult.failed())
            return failure(stockCountResult.value)

        if (pictureResult.failed())
            return failure(pictureResult.value)

        if (subjectResult.failed())
            return failure(subjectResult.value)
        
        if (authorResult.failed())
            return failure(authorResult.value)
        
        if (genreResult.failed())
            return failure(genreResult.value)
        
        if (titleResult.failed())
            return failure(titleResult.value)
        
        if (codeResult.failed())
            return failure(codeResult.value)
        
        const stockCount = stockCountResult.value
        const picture    = pictureResult   .value
        const subject    = subjectResult   .value
        const author     = authorResult    .value
        const genre      = genreResult     .value
        const title      = titleResult     .value
        const code       = codeResult      .value
        
        const createdAt = Timestamp.create()
        const updatedAt = Timestamp.create()

        const createdBy = Id.create(request.createdBy)
        const id        = Id.create()
        
        return success(new Book(createdAt, updatedAt, stockCount, createdBy, picture, subject, author, genre, title, code, id))

    }

    public static with(data: Book.DTO): Book.Response {
        
        const createdAt  = Timestamp .with(data.createdAt)
        const updatedAt  = Timestamp .with(data.updatedAt)
        const stockCount = StockCount.with(data.stockCount)
        const createdBy  = Id        .with(data.createdBy)
        const picture    = Picture   .with(data.picture)
        const subject    = Attribute .with(data.subject)
        const author     = Attribute .with(data.author)
        const genre      = Attribute .with(data.genre)
        const title      = Attribute .with(data.title)
        const code       = Code      .with(data.code)
        const id         = Id        .with(data.id)
        
        return new Book(createdAt, updatedAt, stockCount, createdBy, picture, subject, author, genre, title, code, id)

    }

    public to(): Book.DTO {

        const createdAt  = this.createdAt .to()
        const updatedAt  = this.updatedAt .to()
        const stockCount = this.stockCount.to()
        const createdBy  = this.createdBy .to()
        const picture    = this.picture   .to()
        const subject    = this.subject   .to()
        const author     = this.author    .to()
        const genre      = this.genre     .to()
        const title      = this.title     .to()
        const code       = this.code      .to()
        const id         = this.id        .to()

        return { createdAt, updatedAt, stockCount, createdBy, picture, subject, author, genre, title, code, id }

    }

}