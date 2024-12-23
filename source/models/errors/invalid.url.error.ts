export class InvalidURLError extends Error {
    constructor() {
        super(`The URL is invalid.`)
        this.name = 'InvalidURLError'
    }
}