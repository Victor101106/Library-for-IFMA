import { CartItem } from '@models'
import { CartItemRepository } from './contracts'

export class InMemoryCartItemRepository implements CartItemRepository {
    
    private constructor (
        private readonly database: Array<CartItem>
    ) {}

    public static create(): InMemoryCartItemRepository {
        return new InMemoryCartItemRepository(new Array())
    }

    public async findByUserAndBookId(bookId: string, userId: string): Promise<CartItem | void> {
        return this.database.find(cartItem => cartItem.userId.value == userId && cartItem.bookId.value == bookId)
    }

    public async save(cartitem: CartItem): Promise<void> {
        this.database.push(cartitem)
    }

    public async findManyByUserId(userId: string): Promise<Array<CartItem>> {
        return this.database.filter(cartItem => cartItem.userId.value == userId)
    }

}

export const inMemoryCartItemRepository = InMemoryCartItemRepository.create()