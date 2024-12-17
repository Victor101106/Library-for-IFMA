export class InvalidGoogleIdError extends Error {
    constructor() {
        super(`The google id is invalid.`)
        this.name = 'InvalidGoogleIdError'
    }
}