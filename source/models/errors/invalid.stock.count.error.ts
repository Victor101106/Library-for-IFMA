export class InvalidStockCountError extends Error {
    constructor(stockcount: number) {
        super(`The stock count "${stockcount}" is invalid.`)
        this.name = 'InvalidStockCountError'
    }
}