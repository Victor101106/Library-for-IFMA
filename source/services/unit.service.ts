import { failure, Result, success } from '@helpers'
import { Unit } from '@models'
import { inMemoryUnitRepository } from '@repositories'
import { UnitRepository } from '@repositories/contracts'
import { bookService, BookService } from './book.service'
import { CodeAlreadyInUseError, UnitNotFoundError } from './errors'

export namespace UnitService {
    
    export namespace CreateUnit {
        export type Request = {
            available: boolean
            createdBy: string
            bookId   : string
            code     : number
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
        private readonly unitRepository: UnitRepository,
        private readonly bookService: BookService
    ) {}

    public static create(unitRepository: UnitRepository, bookService: BookService): UnitService {
        return new UnitService(unitRepository, bookService)
    }

    public async createUnit(request: UnitService.CreateUnit.Request): Promise<Result<CodeAlreadyInUseError | Error, UnitService.CreateUnit.Response>> {

        const bookResult = await this.bookService.findBookById(request.bookId)

        if (bookResult.failed())
            return failure(bookResult.value)

        const unitExists = await this.findUnitByCode(request.code)

        if (unitExists.successfully())
            return failure(new CodeAlreadyInUseError())

        const creationResult = Unit.create({
            createdBy: request.createdBy,
            available: request.available,
            bookId: request.bookId,
            code: request.code
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const unit = creationResult.value

        await this.unitRepository.save(unit)

        return success(unit)

    }

    public async findUnitByCode(code: UnitService.FindUnitByCode.Request): Promise<Result<UnitNotFoundError, UnitService.FindUnitByCode.Response>> {
        
        const bookFound = await this.unitRepository.findByCode(code)

        if (!bookFound)
            return failure(new UnitNotFoundError())

        return success(bookFound)

    }

    public async deleteUnitByCode(code: UnitService.DeleteUnitByCode.Request): Promise<Result<UnitNotFoundError, UnitService.DeleteUnitByCode.Response>> {
        
        const deletedUnit = await this.unitRepository.deleteByCode(code)

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

export const unitService = UnitService.create(inMemoryUnitRepository, bookService)