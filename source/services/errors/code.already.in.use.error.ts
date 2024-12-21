export class CodeAlreadyInUseError extends Error {
    constructor() {
        super('The unit code is already in use.')
        this.name = 'CodeAlreadyInUseError'
    }
}