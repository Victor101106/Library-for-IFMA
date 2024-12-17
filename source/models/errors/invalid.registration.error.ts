export class InvalidRegistrationError extends Error {
    constructor(registration: string) {
        super(`The registration "${registration}" is invalid.`)
        this.name = 'InvalidRegistrationError'
    }
}