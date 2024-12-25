import { failure, Result, success } from '@helpers'
import { Book, CartItem } from '@models'
import { BookRepository, CartItemRepository, inMemoryBookRepository, inMemoryCartItemRepository, inMemoryUserRepository, UserRepository } from '@repositories'
import { BookAlreadyInCartError, BookNotFoundError, CartItemNotFoundError, EmptyCartError, UserNotFoundError } from './errors'

export namespace LoanService {
    
    export namespace AddBookToCart {
        export type Request = {
            bookId: string
            userId: string
        }
        export type Response = CartItem
    }

    export namespace RemoveAllBooksFromCart {
        export type Request = string
        export type Response = Array<CartItem>
    }

    export namespace RemoveBookFromCart {
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

    public async removeAllBooksFromCart(userId: LoanService.RemoveAllBooksFromCart.Request): Promise<Result<EmptyCartError, LoanService.RemoveAllBooksFromCart.Response>> {
        
        const deletedCartItems = await this.cartItemRepository.deleteManyByUserId(userId)

        if (!deletedCartItems.length)
            return failure(new EmptyCartError())

        return success(deletedCartItems)

    }

    public async removeBookFromCart(request: LoanService.RemoveBookFromCart.Request): Promise<Result<CartItemNotFoundError, LoanService.RemoveBookFromCart.Response>> {

        const deletedCartItem = await this.cartItemRepository.deleteByIds(request.bookId, request.userId)

        if (!deletedCartItem)
            return failure(new CartItemNotFoundError())

        return success(deletedCartItem)

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