export class InvalidGoogleCredentialError extends Error {
    constructor() {
        super('The Google credential is invalid.')
        this.name = 'InvalidGoogleCredentialError'
    }
}