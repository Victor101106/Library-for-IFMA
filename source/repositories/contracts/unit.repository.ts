import { Unit } from '@models'

export interface UnitRepository {
    deleteAllByBookId(bookId: string): Promise<Array<Unit>>
    findManyByBookId(bookId: string): Promise<Array<Unit>>
    deleteByCode(code: number): Promise<Unit | void>
    findByCode(code: number): Promise<Unit | void>
    findAll(): Promise<Array<Unit>>
    save(unit: Unit): Promise<void>
}