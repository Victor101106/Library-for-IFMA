import { User } from '@models'
import { UserRepository } from './contracts'

export class InMemoryUserRepository implements UserRepository {
    
    private constructor (
        private readonly database: Array<User>
    ) {}

    public static create(): InMemoryUserRepository {
        return new InMemoryUserRepository(new Array())
    }

    public async save(user: User): Promise<void> {
        this.database.push(user)
    }

    public async deleteById(id: string): Promise<User | void> {
        
        const index = this.database.findIndex(user => user.id.value === id)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async findByGoogleId(googleId: string): Promise<User | void> {
        return this.database.find(user => user.googleId.value === googleId)
    }

    public async findById(id: string): Promise<User | void> {
        return this.database.find(user => user.id.value === id)
    }

    public async update(user: User): Promise<void> {
        
        const index = this.database.findIndex(found => found.id.value === user.id.value)

        if (index == -1)
            return

        this.database[index] = user

    }

}

export const inMemoryUserRepository = InMemoryUserRepository.create()