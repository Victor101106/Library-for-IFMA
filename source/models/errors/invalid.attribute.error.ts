export class InvalidAttributeError extends Error {
    constructor(attribute: string) {
        super(`The attribute "${attribute}" is invalid.`)
        this.name = 'InvalidAttributeError'
    }
}