export class UnitNotFoundError extends Error {
    constructor() {
        super('Unit not found.')
        this.name = 'UnitNotFoundError'
    }
}