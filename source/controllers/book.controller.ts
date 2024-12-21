import { badRequest, created, ok } from '@helpers'
import { CreateBookRequest, DeleteBookRequest, GetBookByIdRequest, UpdateBookRequest } from '@schemas/controllers'
import { bookService, BookService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class BookController {

    private constructor (private readonly bookService: BookService) {}

    public static create(bookService: BookService): BookController {
        return new BookController(bookService)
    }

    public async createBookHandler(request: FastifyRequest<CreateBookRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const creationResult = await this.bookService.createBook({
            createdBy: String(request.locals.userId),
            picture: request.body.picture,
            subject: request.body.subject,
            author: request.body.author,
            genre: request.body.genre,
            title: request.body.title
        })

        if (creationResult.failed())
            return badRequest(reply, creationResult.value)

        const book = creationResult.value

        return created(reply, book.to())

    }

    public async getBookByIdHandler(request: FastifyRequest<GetBookByIdRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const findResult = await this.bookService.findBookById(request.params.id)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const book = findResult.value

        return ok(reply, book.to())

    }

    public async updateBookHandler(request: FastifyRequest<UpdateBookRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const updateResult = await this.bookService.updateBook({ ...request.body, ...request.params })

        if (updateResult.failed())
            return badRequest(reply, updateResult.value)

        const book = updateResult.value

        return ok(reply, book.to())

    }

    public async deleteBookHandler(request: FastifyRequest<DeleteBookRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const deleteResult = await this.bookService.deleteBook(request.params.id)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const book = deleteResult.value

        return ok(reply, book.to())

    }

    public async getAllBooksHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const books = await this.bookService.findAllBooks()

        const booksTo = books.map(book => book.to())

        return ok(reply, booksTo)

    }

}

export const bookController = BookController.create(bookService)