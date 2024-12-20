export class CodeAlreadyInUseError extends Error {
    constructor() {
        super('The book code is already in use.')
        this.name = 'CodeAlreadyInUseError'
    }
}