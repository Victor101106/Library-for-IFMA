import { User } from '@models'

export interface UserRepository {
    save(user: User): Promise<void>
    update(user: User): Promise<void>
    deleteById(id: string): Promise<User | void>
    findById(id: string): Promise<User | void>
    findByGoogleId(googleId: string): Promise<User | void>
}