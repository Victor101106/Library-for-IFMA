export class BookCopyNotFoundError extends Error {
    constructor() {
        super('Book copy not found.')
        this.name = 'BookCopyNotFoundError'
    }
}