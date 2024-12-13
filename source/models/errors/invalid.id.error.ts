export class InvalidIdError extends Error {
    constructor() {
        super(`The id is invalid.`)
        this.name = 'InvalidIdError'
    }
}