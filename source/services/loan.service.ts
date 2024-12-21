import { failure, Result, success } from '@helpers/result'
import { CartItem } from '@models'
import { inMemoryCartItemRepository } from '@repositories'
import { CartItemRepository } from '@repositories/contracts'
import { bookService, BookService } from './book.service'
import { BookAlreadyInCartError } from './errors'
import { UserService, userService } from './user.service'

export namespace LoanService {
    
    export namespace AddBookToCart {
        export type Request = {
            bookId: string
            userId: string
        }
        export type Response = CartItem
    }

}

export class LoanService {

    private constructor (
        private readonly cartItemRepository: CartItemRepository,
        private readonly bookService: BookService,
        private readonly userService: UserService
    ) {}

    public static create(cartItemRepository: CartItemRepository, bookService: BookService, userService: UserService): LoanService {
        return new LoanService(cartItemRepository, bookService, userService)
    }

    public async addBookToCart(request: LoanService.AddBookToCart.Request): Promise<Result<BookAlreadyInCartError | Error, LoanService.AddBookToCart.Response>> {

        const bookAlreadyInCart = await this.cartItemRepository.findByUserAndBookId(request.bookId, request.userId)

        if (bookAlreadyInCart)
            return failure(new BookAlreadyInCartError())
        
        const bookResult = await this.bookService.findBookById(request.bookId)
        
        if (bookResult.failed())
            return failure(bookResult.value)

        const userResult = await this.userService.findUserById(request.userId)

        if (userResult.failed())
            return failure(userResult.value)

        const cartItem = CartItem.create({
            bookId: request.bookId,
            userId: request.userId
        })

        await this.cartItemRepository.save(cartItem)

        return success(cartItem)

    }

}

export const loanService = LoanService.create(inMemoryCartItemRepository, bookService, userService)