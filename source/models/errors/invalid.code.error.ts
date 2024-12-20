export class InvalidCodeError extends Error {
    constructor(code: number) {
        super(`The code "${code}" is invalid.`)
        this.name = 'InvalidCodeError'
    }
}