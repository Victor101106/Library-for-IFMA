import { badRequest, created, ok } from '@helpers'
import { CreateUnitRequest, DeleteUnitByCodeRequest, GetUnitByCodeRequest, GetUnitsByBookIdRequest } from '@schemas/controllers'
import { unitService, UnitService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UnitController {

    private constructor (private readonly unitService: UnitService) {}

    public static create(unitService: UnitService): UnitController {
        return new UnitController(unitService)
    }

    public async createUnitHandler(request: FastifyRequest<CreateUnitRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const creationResult = await this.unitService.createUnit({
            createdBy: String(request.locals.userId),
            available: request.body.available,
            bookId: request.body.bookId,
            code: request.body.code
        })

        if (creationResult.failed())
            return badRequest(reply, creationResult.value)

        const unit = creationResult.value

        return created(reply, unit.to())

    }

    public async getUnitByCodeHandler(request: FastifyRequest<GetUnitByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const findResult = await this.unitService.findUnitByCode(request.params.code)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const unit = findResult.value

        return ok(reply, unit.to())

    }

    public async deleteUnitByCodeHandler(request: FastifyRequest<DeleteUnitByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const deleteResult = await this.unitService.deleteUnitByCode(request.params.code)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const unit = deleteResult.value

        return ok(reply, unit.to())

    }

    
    public async getAllUnitsHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const units = await this.unitService.findAllUnits()

        const unitsTo = units.map(unit => unit.to())

        return ok(reply, unitsTo)

    }

    public async findUnitsByBookId(request: FastifyRequest<GetUnitsByBookIdRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const units = await this.unitService.findUnitsByBookId(request.params.id)

        const unitsTo = units.map(unit => unit.to())

        return ok(reply, unitsTo)

    }

}

export const unitController = UnitController.create(unitService)