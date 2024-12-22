import { CartItem } from '@models'
import { CartItemRepository } from './contracts'

export class InMemoryCartItemRepository implements CartItemRepository {
    
    private constructor (
        private readonly database: Array<CartItem>
    ) {}

    public static create(): InMemoryCartItemRepository {
        return new InMemoryCartItemRepository(new Array())
    }

    public async findManyByUserId(userId: string): Promise<Array<CartItem>> {
        return this.database.filter(cartItemFound => cartItemFound.userId.value == userId)
    }

    public async findByIds(bookId: string, userId: string): Promise<CartItem | void> {
        return this.database.find(cartItemFound => cartItemFound.bookId.value == bookId && cartItemFound.userId.value == userId)
    }

    public async deleteByIds(bookId: string, userId: string): Promise<CartItem | void> {
        
        const index = this.database.findIndex(cartItemFound => cartItemFound.bookId.value == bookId && cartItemFound.userId.value == userId)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async saveOne(cartItem: CartItem): Promise<void> {
        this.database.push(cartItem)
    }

}

export const inMemoryCartItemRepository = InMemoryCartItemRepository.create()