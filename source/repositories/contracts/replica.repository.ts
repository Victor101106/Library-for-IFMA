import { Replica } from '@models'

export interface ReplicaRepository {
    deleteAllByBookId(bookId: string): Promise<Array<Replica>>
    findManyByBookId(bookId: string): Promise<Array<Replica>>
    deleteByCode(code: number): Promise<Replica | void>
    findByCode(code: number): Promise<Replica | void>
    findAll(): Promise<Array<Replica>>
    save(replica: Replica): Promise<void>
}