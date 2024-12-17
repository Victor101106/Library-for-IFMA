import { User } from '@models'
import { UserRepository } from './contracts'

export class InMemoryUserRepository implements UserRepository {
    
    private readonly database: Array<User> = new Array()

    private constructor () {}

    public static create(): InMemoryUserRepository {
        return new InMemoryUserRepository()
    }

    async save(user: User): Promise<void> {
        this.database.push(user)
    }

    async deleteById(id: string): Promise<User | void> {
        
        const index = this.database.findIndex(user => user.id.value === id)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

    async findByGoogleId(googleId: string): Promise<User | void> {
        return this.database.find(user => user.googleId.value === googleId)
    }

    async findById(id: string): Promise<User | void> {
        return this.database.find(user => user.id.value === id)
    }

    async update(user: User): Promise<void> {
        
        const index = this.database.findIndex(found => found.id.value === user.id.value)

        if (index == -1)
            return

        this.database[index] = user

    }

}

export const inMemoryUserRepository = InMemoryUserRepository.create()