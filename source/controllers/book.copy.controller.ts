import { badRequest, created, ok } from '@helpers'
import { createBookCopyRequestSchema, deleteBookCopyByCodeRequestSchema, getBookCopyByCodeRequestSchema } from '@schemas/controllers/book.copy'
import { bookCopyService, BookCopyService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class BookCopyController {

    private constructor (private readonly bookCopyService: BookCopyService) {}

    public static create(bookCopyService: BookCopyService): BookCopyController {
        return new BookCopyController(bookCopyService)
    }

    public async createBookCopyHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = createBookCopyRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { body, locals } = validationResult.value
        
        const creationResult = await this.bookCopyService.createBookCopy({
            createdBy: locals.userId,
            available: body.available,
            bookId: body.bookId,
            code: body.code
        })

        if (creationResult.failed())
            return badRequest(reply, creationResult.value)

        const bookCopy = creationResult.value

        return created(reply, bookCopy.to())

    }

    public async getBookCopyByCodeHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = getBookCopyByCodeRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { code } = validationResult.value.params
        
        const findResult = await this.bookCopyService.findBookCopyByCode(code)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const bookCopy = findResult.value

        return ok(reply, bookCopy.to())

    }

    public async deleteBookCopyByCodeHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const validationResult = deleteBookCopyByCodeRequestSchema.validateSafe(request)

        if (validationResult.failed())
            return badRequest(reply, validationResult.value)

        const { code } = validationResult.value.params
        
        const deleteResult = await this.bookCopyService.deleteBookCopyByCode(code)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const bookCopy = deleteResult.value

        return ok(reply, bookCopy.to())

    }

}

export const bookCopyController = BookCopyController.create(bookCopyService)