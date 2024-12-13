export class InvalidPictureError extends Error {
    constructor() {
        super(`The picture is invalid.`)
        this.name = 'InvalidPictureError'
    }
}