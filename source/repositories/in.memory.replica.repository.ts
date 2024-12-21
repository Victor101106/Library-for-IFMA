import { Replica } from '@models'
import { ReplicaRepository } from './contracts'

export class InMemoryReplicaRepository implements ReplicaRepository {
    
    private constructor (
        private readonly database: Array<Replica>
    ) {}

    public static create(): InMemoryReplicaRepository {
        return new InMemoryReplicaRepository(new Array())
    }

    public async save(replica: Replica): Promise<void> {
        this.database.push(replica)
    }

    public async findByCode(code: number): Promise<Replica | void> {
        return this.database.find(replica => replica.code.value == code)
    }

    public async findAll(): Promise<Array<Replica>> {
        return this.database
    }

    public async findManyByBookId(bookId: string): Promise<Array<Replica>> {
        return this.database.filter(replica => replica.bookId.value == bookId)
    }

    public async deleteByCode(code: number): Promise<Replica | void> {

        const index = this.database.findIndex(replica => replica.code.value === code)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async deleteAllByBookId(bookId: string): Promise<Array<Replica>> {

        const replicas = this.database.filter(replica => replica.bookId.value == bookId)

        for (const replica of replicas)
            await this.deleteByCode(replica.code.value)

        return replicas

    }

}

export const inMemoryReplicaRepository = InMemoryReplicaRepository.create()