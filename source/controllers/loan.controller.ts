import { badRequest, ok } from '@helpers/reply'
import { AddBookToCartRequest } from '@schemas/controllers'
import { loanService, LoanService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class LoanController {

    private constructor (private readonly loanService: LoanService) {}

    public static create(loanService: LoanService): LoanController {
        return new LoanController(loanService)
    }

    public async addBookToCartHandler(request: FastifyRequest<AddBookToCartRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const result = await this.loanService.addBookToCart({
            userId: String(request.locals.userId),
            bookId: request.params.bookId
        })

        if (result.failed())
            return badRequest(reply, result.value)

        return ok(reply, result.value.to())

    }

}

export const loanController = LoanController.create(loanService)