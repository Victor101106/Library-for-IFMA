export class BookAlreadyInCartError extends Error {
    constructor() {
        super('Book is already in cart.')
        this.name = 'BookAlreadyInCartError'
    }
}