export class InvalidCredentialError extends Error {
    constructor() {
        super('The credential is invalid.')
        this.name = 'InvalidCredentialError'
    }
}