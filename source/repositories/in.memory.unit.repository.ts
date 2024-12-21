import { Unit } from '@models'
import { UnitRepository } from './contracts'

export class InMemoryUnitRepository implements UnitRepository {
    
    private constructor (
        private readonly database: Array<Unit>
    ) {}

    public static create(): InMemoryUnitRepository {
        return new InMemoryUnitRepository(new Array())
    }

    public async save(unit: Unit): Promise<void> {
        this.database.push(unit)
    }

    public async findByCode(code: number): Promise<Unit | void> {
        return this.database.find(unit => unit.code.value == code)
    }

    public async findAll(): Promise<Array<Unit>> {
        return this.database
    }

    public async findManyByBookId(bookId: string): Promise<Array<Unit>> {
        return this.database.filter(unit => unit.bookId.value == bookId)
    }

    public async deleteByCode(code: number): Promise<Unit | void> {

        const index = this.database.findIndex(unit => unit.code.value === code)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async deleteAllByBookId(bookId: string): Promise<Array<Unit>> {

        const units = this.database.filter(unit => unit.bookId.value == bookId)

        for (const unit of units)
            await this.deleteByCode(unit.code.value)

        return units

    }

}

export const inMemoryUnitRepository = InMemoryUnitRepository.create()