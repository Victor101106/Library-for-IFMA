import { failure, Result, success } from '@helpers'
import { Book } from '@models'
import { inMemoryBookRepository, inMemoryUnitRepository } from '@repositories'
import { BookRepository, UnitRepository } from '@repositories/contracts'
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
            bookId: string
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

    export namespace FindAllBooks {
        export type Request = void
        export type Response = Array<Book>
    }

}

export class BookService {

    private constructor (
        private readonly bookRepository: BookRepository,
        private readonly unitRepository: UnitRepository
    ) {}

    public static create(bookRepository: BookRepository, unitRepository: UnitRepository): BookService {
        return new BookService(bookRepository, unitRepository)
    }

    public async createBook(request: BookService.CreateBook.Request): Promise<Result<Error, BookService.CreateBook.Response>> {

        const createResult = Book.create({
            createdBy: request.createdBy,
            picture: request.picture,
            subject: request.subject,
            author: request.author,
            genre: request.genre,
            title: request.title
        })

        if (createResult.failed())
            return failure(createResult.value)

        const createdBook = createResult.value

        await this.bookRepository.saveOne(createdBook)

        return success(createdBook)

    }

    public async updateBook(request: BookService.UpdateBook.Request): Promise<Result<BookNotFoundError, BookService.UpdateBook.Response>> {
        
        const bookFound = await this.bookRepository.findById(request.bookId)
        
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

        const updatedBook = updateResult.value

        await this.bookRepository.updateOne(updatedBook)

        return success(updatedBook)

    }

    public async deleteBook(bookId: BookService.DeleteBook.Request): Promise<Result<BookNotFoundError, BookService.DeleteBook.Response>> {
        
        const deletedBook = await this.bookRepository.deleteById(bookId)

        if (!deletedBook)
            return failure(new BookNotFoundError())

        await this.unitRepository.deleteManyByBookId(deletedBook.id.value)

        return success(deletedBook)

    }

    public async findBookById(bookId: BookService.FindBookById.Request): Promise<Result<BookNotFoundError, BookService.FindBookById.Response>> {
        
        const bookFound = await this.bookRepository.findById(bookId)

        if (!bookFound)
            return failure(new BookNotFoundError())

        return success(bookFound)

    }

    public async findAllBooks(): Promise<BookService.FindAllBooks.Response> {
        return await this.bookRepository.findAll()
    }

}

export const bookService = BookService.create(inMemoryBookRepository, inMemoryUnitRepository)