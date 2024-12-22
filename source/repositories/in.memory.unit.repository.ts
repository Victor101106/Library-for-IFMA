import { Unit } from '@models'
import { UnitRepository } from './contracts'

export class InMemoryUnitRepository implements UnitRepository {
    
    private constructor (
        private readonly database: Array<Unit>
    ) {}

    public static create(): InMemoryUnitRepository {
        return new InMemoryUnitRepository(new Array())
    }

    public async deleteManyByBookId(bookId: string): Promise<Array<Unit>> {
        
        const unitsFound = this.database.filter(unitFound => unitFound.bookId.value == bookId)

        unitsFound.forEach(
            unitFound => this.deleteByCode(unitFound.code.value)
        )

        return unitsFound

    }

    public async findManyByBookId(bookId: string): Promise<Array<Unit>> {
        return this.database.filter(unitFound => unitFound.bookId.value == bookId)
    }

    public async findAll(): Promise<Array<Unit>> {
        return this.database.map(unitFound => unitFound)
    }

    public async deleteByCode(unitCode: number): Promise<Unit | void> {
        
        const index = this.database.findIndex(unitFound => unitFound.code.value == unitCode)

        if (index === -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async findByCode(unitCode: number): Promise<Unit | void> {
        return this.database.find(unitFound => unitFound.code.value == unitCode)
    }

    public async updateOne(unit: Unit): Promise<void> {
        
        const index = this.database.findIndex(unitFound => unitFound.code.value == unit.code.value)

        if (index === - 1)
            return

        this.database[index] = unit

    }

    public async saveOne(unit: Unit): Promise<void> {
        this.database.push(unit)
    }
    
}

export const inMemoryUnitRepository = InMemoryUnitRepository.create()