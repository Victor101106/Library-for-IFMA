import { badRequest, created, ok } from '@helpers'
import { CreateReplicaRequest, DeleteReplicaByCodeRequest, GetReplicaByCodeRequest, GetReplicasByBookIdRequest } from '@schemas/controllers'
import { replicaService, ReplicaService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class ReplicaController {

    private constructor (private readonly replicaService: ReplicaService) {}

    public static create(replicaService: ReplicaService): ReplicaController {
        return new ReplicaController(replicaService)
    }

    public async createReplicaHandler(request: FastifyRequest<CreateReplicaRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const creationResult = await this.replicaService.createReplica({
            createdBy: String(request.locals.userId),
            available: request.body.available,
            bookId: request.body.bookId,
            code: request.body.code
        })

        if (creationResult.failed())
            return badRequest(reply, creationResult.value)

        const replica = creationResult.value

        return created(reply, replica.to())

    }

    public async getReplicaByCodeHandler(request: FastifyRequest<GetReplicaByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const findResult = await this.replicaService.findReplicaByCode(request.params.code)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const replica = findResult.value

        return ok(reply, replica.to())

    }

    public async deleteReplicaByCodeHandler(request: FastifyRequest<DeleteReplicaByCodeRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const deleteResult = await this.replicaService.deleteReplicaByCode(request.params.code)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const replica = deleteResult.value

        return ok(reply, replica.to())

    }

    
    public async getAllReplicasHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        
        const replicas = await this.replicaService.findAllReplicas()

        const replicasTo = replicas.map(replica => replica.to())

        return ok(reply, replicasTo)

    }

    public async findReplicasByBookId(request: FastifyRequest<GetReplicasByBookIdRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const replicas = await this.replicaService.findReplicasByBookId(request.params.id)

        const replicasTo = replicas.map(replica => replica.to())

        return ok(reply, replicasTo)

    }

}

export const replicaController = ReplicaController.create(replicaService)