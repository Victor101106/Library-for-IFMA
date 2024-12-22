import { Unit } from '@models'

export interface UnitRepository {

    deleteManyByBookId(bookId: string): Promise<Array<Unit>>

    findManyByBookId(bookId: string): Promise<Array<Unit>>

    findAll(): Promise<Array<Unit>>

    deleteByCode(unitCode: number): Promise<Unit | void>
    
    findByCode(unitCode: number): Promise<Unit | void>

    updateOne(unit: Unit): Promise<void>

    saveOne(unit: Unit): Promise<void>

}