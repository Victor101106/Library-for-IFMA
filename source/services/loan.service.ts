import { failure, Result, success } from '@helpers/result'
import { Book, CartItem } from '@models'
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
    
    export namespace GetCartByUserId {
        export type Request = string
        export type Response = Array<Book>
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

        const bookAlreadyInCart = await this.cartItemRepository.findByIds(request.bookId, request.userId)

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

        await this.cartItemRepository.saveOne(cartItem)

        return success(cartItem)

    }

    public async getCartByUserId(userId: LoanService.GetCartByUserId.Request): Promise<Result<Error, LoanService.GetCartByUserId.Response>> {
        
        const cartItems = await this.cartItemRepository.findManyByUserId(userId)
        const cartBooks = new Array<Book>()

        for (const cartItem of cartItems) {

            const bookResult = await this.bookService.findBookById(cartItem.bookId.value)

            if (bookResult.failed())
                return failure(bookResult.value)

            cartBooks.push(bookResult.value)

        }

        return success(cartBooks)

    }

}

export const loanService = LoanService.create(inMemoryCartItemRepository, bookService, userService)