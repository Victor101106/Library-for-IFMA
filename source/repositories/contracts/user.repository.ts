import { User } from '@models'

export interface UserRepository {

    findByGoogleId(googleId: string): Promise<User | void>

    findById(userId: string): Promise<User | void>

    deleteById(userId: string): Promise<User | void>
    
    updateOne(user: User): Promise<void>

    saveOne(user: User): Promise<void>

}