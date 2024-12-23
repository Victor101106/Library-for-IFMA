export class OAuthIdAlreadyInUseError extends Error {
    constructor() {
        super('The Google id is already in use.')
        this.name = 'OAuthIdAlreadyInUseError'
    }
}