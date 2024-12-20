export class CodeAlreadyInUseError extends Error {
    constructor() {
        super('The book copy code is already in use.')
        this.name = 'CodeAlreadyInUseError'
    }
}