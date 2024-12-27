import { badRequest, ok } from '@helpers'
import { AddBookToCartRequest, RemoveBookFromCartRequest } from '@schemas'
import { loanService, LoanService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class LoanController {

    private constructor (private readonly loanService: LoanService) {}

    public static create(loanService: LoanService): LoanController {
        return new LoanController(loanService)
    }

    public async addBookToCartHandler(request: FastifyRequest<AddBookToCartRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const addResult = await this.loanService.addBookToCart({...request.params, ...request.authentication})

        if (addResult.failed())
            return badRequest(reply, addResult.value)

        const addedCartItem = addResult.value

        return ok(reply, addedCartItem.to())

    }

    public async removeAllBooksFromCartHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        const removeResult = await this.loanService.removeAllBooksFromCart(request.authentication.userId)

        if (removeResult.failed())
            return badRequest(reply, removeResult.value)

        const removedCartItems = removeResult.value

        const removedCartItemsTo = removedCartItems.map(removedCartItem => removedCartItem.to())

        return ok(reply, removedCartItemsTo)

    }

    public async removeBookFromCartHandler(request: FastifyRequest<RemoveBookFromCartRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const removeResult = await this.loanService.removeBookFromCart({...request.params, ...request.authentication})

        if (removeResult.failed())
            return badRequest(reply, removeResult.value)

        const removedCartItem = removeResult.value

        return ok(reply, removedCartItem.to())

    }

    public async getBooksFromCartHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const cartBooksResult = await this.loanService.getBooksFromCartByUserId(request.authentication.userId)

        if (cartBooksResult.failed())
            return badRequest(reply, cartBooksResult.value)

        const cartBooks = cartBooksResult.value

        const cartBooksTo = cartBooks.map(cartBook => cartBook.to())

        return ok(reply, cartBooksTo)

    }

}

export const loanController = LoanController.create(loanService)