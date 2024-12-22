export class EmptyCartError extends Error {
    constructor () {
        super('The cart is empty.')
        this.name = 'EmptyCartError'
    }
}