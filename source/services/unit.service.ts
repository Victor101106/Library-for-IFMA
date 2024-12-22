import { failure, Result, success } from '@helpers'
import { Unit } from '@models'
import { inMemoryBookRepository, inMemoryUnitRepository, inMemoryUserRepository } from '@repositories'
import { BookRepository, UnitRepository, UserRepository } from '@repositories/contracts'
import { BookNotFoundError, CodeAlreadyInUseError, UnitNotFoundError, UserNotFoundError } from './errors'

export namespace UnitService {
    
    export namespace CreateUnit {
        export type Request = {
            available: boolean
            createdBy: string
            bookId: string
            code: number
        }
        export type Response = Unit
    }

    export namespace UpdateUnit {
        export type Request = {
            available?: boolean
            unitCode: number
        }
        export type Response = Unit
    }

    export namespace FindUnitByCode {
        export type Request = number
        export type Response = Unit
    }

    export namespace FindAllUnits {
        export type Request = void
        export type Response = Array<Unit>
    }

    export namespace DeleteUnitByCode {
        export type Request = number
        export type Response = Unit
    }

    export namespace FindUnitsByBookId {
        export type Request = string
        export type Response = Array<Unit>
    }

}

export class UnitService {

    private constructor (
        private readonly bookRepository: BookRepository,
        private readonly unitRepository: UnitRepository,
        private readonly userRepository: UserRepository
    ) {}

    public static create(bookRepository: BookRepository, unitRepository: UnitRepository, userRepository: UserRepository): UnitService {
        return new UnitService(bookRepository, unitRepository, userRepository)
    }

    public async createUnit(request: UnitService.CreateUnit.Request): Promise<Result<BookNotFoundError | CodeAlreadyInUseError | UserNotFoundError, UnitService.CreateUnit.Response>> {

        const unitFound = await this.unitRepository.findByCode(request.code)

        if (unitFound)
            return failure(new CodeAlreadyInUseError())

        const bookFound = await this.bookRepository.findById(request.bookId)

        if (!bookFound)
            return failure(new BookNotFoundError())

        const userFound = await this.userRepository.findById(request.createdBy)

        if (!userFound)
            return failure(new UserNotFoundError())

        const createResult = Unit.create({
            createdBy: request.createdBy,
            available: request.available,
            bookId: request.bookId,
            code: request.code
        })

        if (createResult.failed())
            return failure(createResult.value)

        const unitCreated = createResult.value

        await this.unitRepository.saveOne(unitCreated)

        return success(unitCreated)

    }

    public async updateUnit(request: UnitService.UpdateUnit.Request): Promise<Result<UnitNotFoundError, UnitService.UpdateUnit.Response>> {

        const unitFound = await this.unitRepository.findByCode(request.unitCode)

        if (!unitFound)
            return failure(new UnitNotFoundError())

        const updateResult = unitFound.update({
            available: request.available
        })

        if (updateResult.failed())
            return failure(updateResult.value)

        const updatedUnit = updateResult.value

        await this.unitRepository.updateOne(updatedUnit)

        return success(updatedUnit)

    }

    public async findUnitByCode(unitCode: UnitService.FindUnitByCode.Request): Promise<Result<UnitNotFoundError, UnitService.FindUnitByCode.Response>> {
        
        const unitFound = await this.unitRepository.findByCode(unitCode)

        if (!unitFound)
            return failure(new UnitNotFoundError())

        return success(unitFound)

    }

    public async deleteUnitByCode(unitCode: UnitService.DeleteUnitByCode.Request): Promise<Result<UnitNotFoundError, UnitService.DeleteUnitByCode.Response>> {
        
        const deletedUnit = await this.unitRepository.deleteByCode(unitCode)

        if (!deletedUnit)
            return failure(new UnitNotFoundError())

        return success(deletedUnit)

    }

    public async findAllUnits(): Promise<UnitService.FindAllUnits.Response> {
        return await this.unitRepository.findAll()
    }

    public async findUnitsByBookId(bookId: UnitService.FindUnitsByBookId.Request): Promise<UnitService.FindUnitsByBookId.Response> {
        return await this.unitRepository.findManyByBookId(bookId)
    }

}

export const unitService = UnitService.create(
    inMemoryBookRepository,
    inMemoryUnitRepository,
    inMemoryUserRepository
)