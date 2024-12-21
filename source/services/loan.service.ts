import { failure, Result, success } from '@helpers/result'
import { Book, CartItem } from '@models'
import { inMemoryBookRepository, inMemoryCartItemRepository, inMemoryUserRepository } from '@repositories'
import { BookRepository, CartItemRepository, UserRepository } from '@repositories/contracts'
import { BookAlreadyInCartError, BookNotFoundError, UserNotFoundError } from './errors'

export namespace LoanService {
    
    export namespace AddBookToCart {
        export type Request = {
            bookId: string
            userId: string
        }
        export type Response = CartItem
    }
    
    export namespace GetBooksFromCartByUserId {
        export type Request = string
        export type Response = Array<Book>
    }

}

export class LoanService {

    private constructor (
        private readonly cartItemRepository: CartItemRepository,
        private readonly bookRepository: BookRepository,
        private readonly userRepository: UserRepository
    ) {}

    public static create(cartItemRepository: CartItemRepository, bookRepository: BookRepository, userRepository: UserRepository): LoanService {
        return new LoanService(cartItemRepository, bookRepository, userRepository)
    }

    public async addBookToCart(request: LoanService.AddBookToCart.Request): Promise<Result<BookAlreadyInCartError | BookNotFoundError | UserNotFoundError, LoanService.AddBookToCart.Response>> {

        const cartItemFound = await this.cartItemRepository.findByIds(request.bookId, request.userId)

        if (cartItemFound)
            return failure(new BookAlreadyInCartError())
        
        const bookFound = await this.bookRepository.findById(request.bookId)

        if (!bookFound)
            return failure(new BookNotFoundError())

        const userFound = await this.userRepository.findById(request.userId)

        if (!userFound)
            return failure(new UserNotFoundError())

        const cartItemCreated = CartItem.create({
            bookId: bookFound.id.value,
            userId: userFound.id.value
        })

        await this.cartItemRepository.saveOne(cartItemCreated)

        return success(cartItemCreated)

    }

    public async getBooksFromCartByUserId(userId: LoanService.GetBooksFromCartByUserId.Request): Promise<Result<BookNotFoundError, LoanService.GetBooksFromCartByUserId.Response>> {
        
        const cartItemsFound = await this.cartItemRepository.findManyByUserId(userId)

        const cartBooks = new Array<Book>()

        for (const cartItemFound of cartItemsFound) {

            const bookFound = await this.bookRepository.findById(cartItemFound.bookId.value)

            if (!bookFound)
                return failure(new BookNotFoundError())

            cartBooks.push(bookFound)

        }

        return success(cartBooks)

    }

}

export const loanService = LoanService.create(
    inMemoryCartItemRepository,
    inMemoryBookRepository,
    inMemoryUserRepository
)