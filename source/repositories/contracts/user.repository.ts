import { User } from '@models'

export interface UserRepository {

    findByOAuthId(oAuthId: string): Promise<User | void>

    findById(userId: string): Promise<User | void>

    findAll(): Promise<Array<User>>

    deleteById(userId: string): Promise<User | void>
    
    updateOne(user: User): Promise<void>

    saveOne(user: User): Promise<void>

}