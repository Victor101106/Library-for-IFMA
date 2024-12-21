import { failure, Result, success } from '@helpers'
import { Book } from '@models'
import { inMemoryBookCopyRepository, inMemoryBookRepository } from '@repositories'
import { BookCopyRepository, BookRepository } from '@repositories/contracts'
import { BookNotFoundError } from './errors'

export namespace BookService {
    
    export namespace CreateBook {
        export type Request = {
            createdBy: string
            picture?: string
            subject: string
            author: string
            genre: string
            title: string
        }
        export type Response = Book
    }

    export namespace UpdateBook {
        export type Request = {
            picture?: string
            subject?: string
            author?: string
            genre?: string
            title?: string
            id: string
        }
        export type Response = Book
    }

    export namespace DeleteBook {
        export type Request = string
        export type Response = Book
    }

    export namespace FindBookById {
        export type Request = string
        export type Response = Book
    }

    export namespace FindAllBookCopies {
        export type Request = void
        export type Response = Array<Book>
    }

}

export class BookService {

    private constructor (
        private readonly bookRepository: BookRepository,
        private readonly bookCopyRepository: BookCopyRepository
    ) {}

    public static create(bookRepository: BookRepository, bookCopyRepository: BookCopyRepository): BookService {
        return new BookService(bookRepository, bookCopyRepository)
    }

    public async createBook(request: BookService.CreateBook.Request): Promise<Result<Error, BookService.CreateBook.Response>> {

        const creationResult = Book.create({
            createdBy: request.createdBy,
            picture: request.picture,
            subject: request.subject,
            author: request.author,
            genre: request.genre,
            title: request.title
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const book = creationResult.value

        await this.bookRepository.save(book)

        return success(book)

    }

    public async updateBook(request: BookService.UpdateBook.Request): Promise<Result<BookNotFoundError, BookService.UpdateBook.Response>> {
        
        const bookFound = await this.bookRepository.findById(request.id)
        
        if (!bookFound)
            return failure(new BookNotFoundError())

        const updateResult = bookFound.update({
            picture: request.picture,
            subject: request.subject,
            author: request.author,
            genre: request.genre,
            title: request.title
        })

        if (updateResult.failed())
            return failure(updateResult.value)

        const book = updateResult.value

        await this.bookRepository.update(book)

        return success(book)

    }

    public async deleteBook(id: BookService.DeleteBook.Request): Promise<Result<BookNotFoundError, BookService.DeleteBook.Response>> {
        
        const deletedBook = await this.bookRepository.delete(id)

        if (!deletedBook)
            return failure(new BookNotFoundError())

        await this.bookCopyRepository.deleteAllByBookId(deletedBook.id.value)

        return success(deletedBook)

    }

    public async findBookById(id: BookService.FindBookById.Request): Promise<Result<BookNotFoundError, BookService.FindBookById.Response>> {
        
        const bookFound = await this.bookRepository.findById(id)

        if (!bookFound)
            return failure(new BookNotFoundError())

        return success(bookFound)

    }

    public async findAllBooks(): Promise<BookService.FindAllBookCopies.Response> {
        return await this.bookRepository.findAll()
    }

}

export const bookService = BookService.create(inMemoryBookRepository, inMemoryBookCopyRepository)