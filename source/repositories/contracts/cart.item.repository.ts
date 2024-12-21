import { CartItem } from '@models'

export interface CartItemRepository {
    findByUserAndBookId(bookId: string, userId: string): Promise<CartItem | void>
    findManyByUserId(userId: string): Promise<Array<CartItem>>
    save(cartItem: CartItem): Promise<void>
}