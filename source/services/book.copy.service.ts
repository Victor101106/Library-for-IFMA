import { failure, Result, success } from '@helpers'
import { BookCopy } from '@models'
import { inMemoryBookCopyRepository } from '@repositories'
import { BookCopyRepository } from '@repositories/contracts'
import { bookService, BookService } from './book.service'
import { BookCopyNotFoundError, CodeAlreadyInUseError } from './errors'

export namespace BookCopyService {
    
    export namespace CreateBookCopy {
        export type Request = {
            available: boolean
            createdBy: string
            bookId   : string
            code     : number
        }
        export type Response = BookCopy
    }

    export namespace FindBookCopyByCode {
        export type Request = number
        export type Response = BookCopy
    }

    export namespace DeleteBookCopyByCode {
        export type Request = number
        export type Response = BookCopy
    }

}

export class BookCopyService {

    private constructor (
        private readonly bookCopyRepository: BookCopyRepository,
        private readonly bookService: BookService
    ) {}

    public static create(bookCopyRepository: BookCopyRepository, bookService: BookService): BookCopyService {
        return new BookCopyService(bookCopyRepository, bookService)
    }

    public async createBookCopy(request: BookCopyService.CreateBookCopy.Request): Promise<Result<CodeAlreadyInUseError | Error, BookCopyService.CreateBookCopy.Response>> {

        const bookResult = await this.bookService.findBookById(request.bookId)

        if (bookResult.failed())
            return failure(bookResult.value)

        const bookCopyExists = await this.findBookCopyByCode(request.code)

        if (bookCopyExists.successfully())
            return failure(new CodeAlreadyInUseError())

        const creationResult = BookCopy.create({
            createdBy: request.createdBy,
            available: request.available,
            bookId: request.bookId,
            code: request.code
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const bookCopy = creationResult.value

        await this.bookCopyRepository.save(bookCopy)

        return success(bookCopy)

    }

    public async findBookCopyByCode(code: BookCopyService.FindBookCopyByCode.Request): Promise<Result<BookCopyNotFoundError, BookCopyService.FindBookCopyByCode.Response>> {
        
        const bookFound = await this.bookCopyRepository.findByCode(code)

        if (!bookFound)
            return failure(new BookCopyNotFoundError())

        return success(bookFound)

    }

    public async deleteBookCopyByCode(code: BookCopyService.DeleteBookCopyByCode.Request): Promise<Result<BookCopyNotFoundError, BookCopyService.DeleteBookCopyByCode.Response>> {
        
        const deletedBookCopy = await this.bookCopyRepository.deleteByCode(code)

        if (!deletedBookCopy)
            return failure(new BookCopyNotFoundError())

        return success(deletedBookCopy)

    }

}

export const bookCopyService = BookCopyService.create(inMemoryBookCopyRepository, bookService)