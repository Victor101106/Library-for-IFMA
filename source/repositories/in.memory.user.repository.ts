import { UserModel } from '@models'
import { UserRepository } from './contracts'

export class InMemoryUserRepository implements UserRepository {
    
    private readonly database: Array<UserModel> = new Array()

    private constructor () {}

    public static create(): InMemoryUserRepository {
        return new InMemoryUserRepository()
    }

    async save(user: UserModel): Promise<void> {
        this.database.push(user)
    }

    async deleteById(id: string): Promise<UserModel | void> {
        
        const index = this.database.findIndex(user => user.id === id)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

    async findByGoogleId(googleId: string): Promise<UserModel | void> {
        return this.database.find(user => user.googleId === googleId)
    }

    async findById(id: string): Promise<UserModel | void> {
        return this.database.find(user => user.id === id)
    }

    async update(user: UserModel): Promise<void> {
        
        const index = this.database.findIndex(found => found.id === user.id)

        if (index == -1)
            return

        this.database[index] = user

    }

}

export const inMemoryUserRepository = InMemoryUserRepository.create()