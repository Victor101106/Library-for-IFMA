import { failure, Result, success } from '@helpers'
import { Replica } from '@models'
import { inMemoryReplicaRepository } from '@repositories'
import { ReplicaRepository } from '@repositories/contracts'
import { bookService, BookService } from './book.service'
import { CodeAlreadyInUseError, ReplicaNotFoundError } from './errors'

export namespace ReplicaService {
    
    export namespace CreateReplica {
        export type Request = {
            available: boolean
            createdBy: string
            bookId   : string
            code     : number
        }
        export type Response = Replica
    }

    export namespace FindReplicaByCode {
        export type Request = number
        export type Response = Replica
    }

    export namespace FindAllReplicas {
        export type Request = void
        export type Response = Array<Replica>
    }

    export namespace DeleteReplicaByCode {
        export type Request = number
        export type Response = Replica
    }

    export namespace FindReplicasByBookId {
        export type Request = string
        export type Response = Array<Replica>
    }

}

export class ReplicaService {

    private constructor (
        private readonly replicaRepository: ReplicaRepository,
        private readonly bookService: BookService
    ) {}

    public static create(replicaRepository: ReplicaRepository, bookService: BookService): ReplicaService {
        return new ReplicaService(replicaRepository, bookService)
    }

    public async createReplica(request: ReplicaService.CreateReplica.Request): Promise<Result<CodeAlreadyInUseError | Error, ReplicaService.CreateReplica.Response>> {

        const bookResult = await this.bookService.findBookById(request.bookId)

        if (bookResult.failed())
            return failure(bookResult.value)

        const replicaExists = await this.findReplicaByCode(request.code)

        if (replicaExists.successfully())
            return failure(new CodeAlreadyInUseError())

        const creationResult = Replica.create({
            createdBy: request.createdBy,
            available: request.available,
            bookId: request.bookId,
            code: request.code
        })

        if (creationResult.failed())
            return failure(creationResult.value)

        const replica = creationResult.value

        await this.replicaRepository.save(replica)

        return success(replica)

    }

    public async findReplicaByCode(code: ReplicaService.FindReplicaByCode.Request): Promise<Result<ReplicaNotFoundError, ReplicaService.FindReplicaByCode.Response>> {
        
        const bookFound = await this.replicaRepository.findByCode(code)

        if (!bookFound)
            return failure(new ReplicaNotFoundError())

        return success(bookFound)

    }

    public async deleteReplicaByCode(code: ReplicaService.DeleteReplicaByCode.Request): Promise<Result<ReplicaNotFoundError, ReplicaService.DeleteReplicaByCode.Response>> {
        
        const deletedReplica = await this.replicaRepository.deleteByCode(code)

        if (!deletedReplica)
            return failure(new ReplicaNotFoundError())

        return success(deletedReplica)

    }

    public async findAllReplicas(): Promise<ReplicaService.FindAllReplicas.Response> {
        return await this.replicaRepository.findAll()
    }

    public async findReplicasByBookId(bookId: ReplicaService.FindReplicasByBookId.Request): Promise<ReplicaService.FindReplicasByBookId.Response> {
        return await this.replicaRepository.findManyByBookId(bookId)
    }

}

export const replicaService = ReplicaService.create(inMemoryReplicaRepository, bookService)