export class AccessTokenMissingError extends Error {
    constructor () {
        super('The access token is missing.')
        this.name = 'AccessTokenMissingError'
    }
}