export class CodeAlreadyInUseError extends Error {
    constructor() {
        super('The replica code is already in use.')
        this.name = 'CodeAlreadyInUseError'
    }
}