import { failure, Result, success } from '@helpers'
import { z } from 'zod'
import { InvalidStockCountError } from './errors'

export namespace StockCount {
    export type Request = number
    export type DTO = number
    export type Response = StockCount
}

export class StockCount {

    private constructor (
        private stockCount: number
    ) {}

    public static create(stockCount: StockCount.Request): Result<InvalidStockCountError, StockCount.Response> {
        
        const isInvalidStockCount = !StockCount.validate(stockCount)

        if (isInvalidStockCount)
            return failure(new InvalidStockCountError(stockCount))
        
        return success(new StockCount(stockCount))

    }

    public static with(stockCount: StockCount.DTO): StockCount.Response {
        return new StockCount(stockCount)
    }

    public static validate(stockCount: number): boolean {
        return z.number().int().positive().safeParse(stockCount).success
    }

    public update(stockCount: number): Result<InvalidStockCountError, number> {

        if (!StockCount.validate(stockCount))
            return failure(new InvalidStockCountError(stockCount))

        return success(this.stockCount = stockCount)

    }

    public increase(value: number): Result<InvalidStockCountError, number> {
        
        const newStockCount = this.stockCount + Math.abs(value)

        if (!StockCount.validate(newStockCount))
            return failure(new InvalidStockCountError(newStockCount))

        return success(this.stockCount = newStockCount)

    }

    public decrease(value: number): Result<InvalidStockCountError, number> {
        
        const newStockCount = this.stockCount - Math.abs(value)

        if (!StockCount.validate(newStockCount))
            return failure(new InvalidStockCountError(newStockCount))

        return success(this.stockCount = newStockCount)

    }

    public get value(): number {
        return this.stockCount
    }

    public to(): StockCount.DTO {
        return this.value
    }

}