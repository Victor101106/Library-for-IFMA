import { UserModel } from '@models'

export interface UserRepository {
    save(user: UserModel): Promise<void>
    update(user: UserModel): Promise<void>
    deleteById(id: string): Promise<UserModel | void>
    findById(id: string): Promise<UserModel | void>
    findByGoogleId(googleId: string): Promise<UserModel | void>
}