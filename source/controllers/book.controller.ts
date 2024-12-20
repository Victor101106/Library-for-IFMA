import { badRequest, created, ok } from '@helpers'
import { createBookRequestSchema, deleteBookRequestSchema, getBookByIdRequestSchema, updateBookRequestSchema } from '@schemas/controllers/book'
import { bookService, BookService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class BookController {

    private constructor (private readonly bookService: BookService) {}

    public static create(bookService: BookService): BookController {
        return new BookController(bookService)
    }

    public async createBookHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = createBookRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { body, locals } = validationResult.value
        
        const creationResult = await this.bookService.createBook({
            createdBy: locals.userId,
            picture: body.picture,
            subject: body.subject,
            author: body.author,
            genre: body.genre,
            title: body.title
        })

        if (creationResult.failed())
            return badRequest(reply, creationResult.value)

        const book = creationResult.value

        return created(reply, book.to())

    }

    public async getBookByIdHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = getBookByIdRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { id } = validationResult.value.params
        
        const findResult = await this.bookService.findBookById(id)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const book = findResult.value

        return ok(reply, book.to())

    }

    public async updateBookHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = updateBookRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { params, body } = validationResult.value
        
        const updateResult = await this.bookService.updateBook({ ...body, ...params })

        if (updateResult.failed())
            return badRequest(reply, updateResult.value)

        const book = updateResult.value

        return ok(reply, book.to())

    }

    public async deleteBookHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = deleteBookRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { id } = validationResult.value.params
        
        const deleteResult = await this.bookService.deleteBook(id)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const book = deleteResult.value

        return ok(reply, book.to())

    }

}

export const bookController = BookController.create(bookService)