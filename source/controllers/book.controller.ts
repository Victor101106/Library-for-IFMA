import { badRequest, created, ok } from '@helpers'
import { createBookRequestSchema, getBookByCodeRequestSchema, updateBookRequestSchema } from '@schemas/controllers/book'
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
            stockCount: body.stockCount,
            createdBy: locals.userId,
            picture: body.picture,
            subject: body.subject,
            author: body.author,
            genre: body.genre,
            title: body.title,
            code: body.code
        })

        if (creationResult.failed())
            return badRequest(reply, creationResult.value)

        const book = creationResult.value

        return created(reply, book.to())

    }

    public async getBookByCodeHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = getBookByCodeRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { code } = validationResult.value.params
        
        const findResult = await this.bookService.findBookByCode(code)

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

}

export const bookController = BookController.create(bookService)