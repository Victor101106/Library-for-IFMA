export class InvalidGoogleCodeError extends Error {
    constructor() {
        super('The Google code is invalid.')
        this.name = 'InvalidGoogleCodeError'
    }
}