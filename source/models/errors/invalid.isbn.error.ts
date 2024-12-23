export class InvalidISBNError extends Error {
    constructor(isbn: string) {
        super(`The ISBN "${isbn}" is invalid.`)
        this.name = 'InvalidISBNError'
    }
}