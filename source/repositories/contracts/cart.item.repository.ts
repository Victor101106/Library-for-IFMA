import { CartItem } from '@models'

export interface CartItemRepository {
    findByUserAndBookId(bookId: string, userId: string): Promise<CartItem | void>
    save(cartItem: CartItem): Promise<void>
}