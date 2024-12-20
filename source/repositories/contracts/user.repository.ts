import { User } from '@models'

export interface UserRepository {
    findByGoogleId(googleId: string): Promise<User | void>
    deleteById(id: string): Promise<User | void>
    findById(id: string): Promise<User | void>
    update(user: User): Promise<void>
    save(user: User): Promise<void>
}