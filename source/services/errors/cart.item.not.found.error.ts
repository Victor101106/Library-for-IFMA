export class CartItemNotFoundError extends Error {
    constructor() {
        super('Cart item not found.')
        this.name = 'CartItemNotFoundError'
    }
}