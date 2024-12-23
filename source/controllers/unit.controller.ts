import { badRequest, created, forbidden, ok } from '@helpers'
import { CreateUnitRequest, DeleteUnitByCodeRequest, FindUnitByCodeRequest, FindUnitsByBookIdRequest, UpdateUnitRequest } from '@schemas/controllers'
import { authorizationService, AuthorizationService, unitService, UnitService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class UnitController {

    private constructor (
        private readonly authorizationService: AuthorizationService,
        private readonly unitService: UnitService
    ) {}

    public static create(authorizationService: AuthorizationService, unitService: UnitService): UnitController {
        return new UnitController(authorizationService, unitService)
    }

    public async createUnitHandler(request: FastifyRequest<CreateUnitRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('create', 'Unit'))
            return forbidden(reply)
        
        const createResult = await this.unitService.createUnit({
            createdBy: String(request.locals.userId),
            available: request.body.available,
            bookId: request.params.bookId,
            code: request.body.code
        })

        if (createResult.failed())
            return badRequest(reply, createResult.value)

        const unitCreated = createResult.value

        return created(reply, unitCreated.to())

    }

    public async updateUnitHandler(request: FastifyRequest<UpdateUnitRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('update', 'Unit'))
            return forbidden(reply)

        const updateResult = await this.unitService.updateUnit({...request.body, ...request.params})

        if (updateResult.failed())
            return badRequest(reply, updateResult.value)

        const updatedUnit = updateResult.value

        return ok(reply, updatedUnit.to())

    }

    public async findUnitByCodeHandler(request: FastifyRequest<FindUnitByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('get', 'Unit'))
            return forbidden(reply)

        const findResult = await this.unitService.findUnitByCode(request.params.unitCode)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const unitFound = findResult.value

        return ok(reply, unitFound.to())

    }

    public async deleteUnitByCodeHandler(request: FastifyRequest<DeleteUnitByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('delete', 'Unit'))
            return forbidden(reply)

        const deleteResult = await this.unitService.deleteUnitByCode(request.params.unitCode)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const deletedUnit = deleteResult.value

        return ok(reply, deletedUnit.to())

    }

    
    public async findAllUnitsHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('get-all', 'Unit'))
            return forbidden(reply)
        
        const unitsFound = await this.unitService.findAllUnits()

        const unitsFoundTo = unitsFound.map(unitFound => unitFound.to())

        return ok(reply, unitsFoundTo)

    }

    public async findUnitsByBookId(request: FastifyRequest<FindUnitsByBookIdRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('get', 'Unit'))
            return forbidden(reply)
        
        const unitsFound = await this.unitService.findUnitsByBookId(request.params.bookId)

        const unitsFoundTo = unitsFound.map(unitFound => unitFound.to())

        return ok(reply, unitsFoundTo)

    }

}

export const unitController = UnitController.create(
    authorizationService,
    unitService
)