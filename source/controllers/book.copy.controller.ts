import { badRequest, created, ok } from '@helpers'
import { CreateBookCopyRequest, DeleteBookCopyByCodeRequest, GetBookCopyByCodeRequest } from '@schemas/controllers'
import { bookCopyService, BookCopyService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class BookCopyController {

    private constructor (private readonly bookCopyService: BookCopyService) {}

    public static create(bookCopyService: BookCopyService): BookCopyController {
        return new BookCopyController(bookCopyService)
    }

    public async createBookCopyHandler(request: FastifyRequest<CreateBookCopyRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const creationResult = await this.bookCopyService.createBookCopy({
            createdBy: String(request.locals.userId),
            available: request.body.available,
            bookId: request.body.bookId,
            code: request.body.code
        })

        if (creationResult.failed())
            return badRequest(reply, creationResult.value)

        const bookCopy = creationResult.value

        return created(reply, bookCopy.to())

    }

    public async getBookCopyByCodeHandler(request: FastifyRequest<GetBookCopyByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const findResult = await this.bookCopyService.findBookCopyByCode(request.params.code)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const bookCopy = findResult.value

        return ok(reply, bookCopy.to())

    }

    public async deleteBookCopyByCodeHandler(request: FastifyRequest<DeleteBookCopyByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const deleteResult = await this.bookCopyService.deleteBookCopyByCode(request.params.code)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const bookCopy = deleteResult.value

        return ok(reply, bookCopy.to())

    }

    
    public async getAllBookCopiesHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const bookCopies = await this.bookCopyService.findAllBookCopies()

        const bookCopiesTo = bookCopies.map(bookCopy => bookCopy.to())

        return ok(reply, bookCopiesTo)

    }


}

export const bookCopyController = BookCopyController.create(bookCopyService)