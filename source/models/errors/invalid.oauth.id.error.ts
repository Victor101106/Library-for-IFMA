export class InvalidOAuthIdError extends Error {
    constructor() {
        super(`The google id is invalid.`)
        this.name = 'InvalidOAuthIdError'
    }
}