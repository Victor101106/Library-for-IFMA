import { User } from '@models'
import { UserRepository } from './contracts'

export class InMemoryUserRepository implements UserRepository {
    
    private constructor (
        private readonly database: Array<User>
    ) {}

    public static create(): InMemoryUserRepository {
        return new InMemoryUserRepository(new Array())
    }

    public async findByGoogleId(googleId: string): Promise<User | void> {
        return this.database.find(userFound => userFound.googleId.value == googleId)
    }

    public async findById(userId: string): Promise<User | void> {
        return this.database.find(userFound => userFound.id.value == userId)
    }

    public async deleteById(userId: string): Promise<User | void> {
        
        const index = this.database.findIndex(userFound => userFound.id.value == userId)

        if (index === -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async updateOne(user: User): Promise<void> {

        const index = this.database.findIndex(userFound => userFound.id.value == user.id.value)

        if (index === -1)
            return

        this.database[index] = user
        
    }

    public async saveOne(user: User): Promise<void> {
        this.database.push(user)
    }

}

export const inMemoryUserRepository = InMemoryUserRepository.create()