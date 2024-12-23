import { failure, Result, success } from '@helpers'
import { Attribute, Id, Timestamp, URL } from './index'

export namespace Book {
    
    export type Request = {
        coverImage?: string
        createdBy  : string
        subject    : string
        author     : string
        genre      : string
        title      : string
    }
    
    export type DTO = Request & {
        createdAt: number
        updatedAt: number
        id       : string
    }
    
    export type Response = Book
    
    export namespace Update {
        export type Request = {
            coverImage?: string | void
            subject   ?: string | void
            author    ?: string | void
            genre     ?: string | void
            title     ?: string | void
        }
        export type Response = Book
    }

}

export class Book {

    private constructor (
        public readonly createdAt : Timestamp,
        public readonly updatedAt : Timestamp,
        public readonly createdBy : Id,
        public readonly coverImage: URL,
        public readonly subject   : Attribute,
        public readonly author    : Attribute,
        public readonly genre     : Attribute,
        public readonly title     : Attribute,
        public readonly id        : Id
    ) {}

    public static create(request: Book.Request): Result<Error, Book.Response> {

        const coverImageResult = URL      .create(request.coverImage)
        const subjectResult    = Attribute.create(request.subject)
        const authorResult     = Attribute.create(request.author)
        const genreResult      = Attribute.create(request.genre)
        const titleResult      = Attribute.create(request.title)
        
        if (coverImageResult.failed())
            return failure(coverImageResult.value)

        if (subjectResult.failed())
            return failure(subjectResult.value)
        
        if (authorResult.failed())
            return failure(authorResult.value)
        
        if (genreResult.failed())
            return failure(genreResult.value)
        
        if (titleResult.failed())
            return failure(titleResult.value)
        
        const coverImage = coverImageResult.value
        const subject    = subjectResult   .value
        const author     = authorResult    .value
        const genre      = genreResult     .value
        const title      = titleResult     .value
        
        const createdAt = Timestamp.create()
        const updatedAt = Timestamp.create()

        const createdBy = Id.create(request.createdBy)
        const id        = Id.create()
        
        return success(new Book(createdAt, updatedAt, createdBy, coverImage, subject, author, genre, title, id))

    }

    public static with(data: Book.DTO): Book.Response {
        
        const createdAt  = Timestamp.with(data.createdAt)
        const updatedAt  = Timestamp.with(data.updatedAt)
        const createdBy  = Id       .with(data.createdBy)
        const coverImage = URL      .with(data.coverImage)
        const subject    = Attribute.with(data.subject)
        const author     = Attribute.with(data.author)
        const genre      = Attribute.with(data.genre)
        const title      = Attribute.with(data.title)
        const id         = Id       .with(data.id)
        
        return new Book(createdAt, updatedAt, createdBy, coverImage, subject, author, genre, title, id)

    }

    public update(request: Book.Update.Request): Result<Error, Book.Update.Response> {

        const results = [
            request.coverImage ? this.coverImage.update(request.coverImage) : undefined,
            request.subject    ? this.subject   .update(request.subject)    : undefined,
            request.author     ? this.author    .update(request.author)     : undefined,
            request.genre      ? this.genre     .update(request.genre)      : undefined,
            request.title      ? this.title     .update(request.title)      : undefined
        ]

        for (const result of results)
            if (result?.failed())
                return failure(result.value)
        
        this.updatedAt.update(new Date())

        return success(this)

    }

    public to(): Book.DTO {

        const createdAt  = this.createdAt .to()
        const updatedAt  = this.updatedAt .to()
        const createdBy  = this.createdBy .to()
        const coverImage = this.coverImage.to()
        const subject    = this.subject   .to()
        const author     = this.author    .to()
        const genre      = this.genre     .to()
        const title      = this.title     .to()
        const id         = this.id        .to()

        return { createdAt, updatedAt, createdBy, coverImage, subject, author, genre, title, id }

    }

}