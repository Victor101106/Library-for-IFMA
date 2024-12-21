export class GoogleIdAlreadyInUseError extends Error {
    constructor() {
        super('The Google id is already in use.')
        this.name = 'GoogleIdAlreadyInUseError'
    }
}