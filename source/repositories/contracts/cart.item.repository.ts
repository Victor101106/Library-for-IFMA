import { CartItem } from '@models'

export interface CartItemRepository {
    
    findByIds(bookId: string, userId: string): Promise<CartItem | void>

    findManyByUserId(userId: string): Promise<Array<CartItem>>

    deleteByIds(bookId: string, userId: string): Promise<CartItem | void>

    saveOne(cartItem: CartItem): Promise<void>

}