export class InvalidSiapeError extends Error {
    constructor(siape: number) {
        super(`The SIAPE "${siape}" is invalid.`)
        this.name = 'InvalidSiapeError'
    }
}