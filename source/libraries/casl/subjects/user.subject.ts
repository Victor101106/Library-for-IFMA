import { User } from '@models'

export type UserActions = 'manage' | 'update' | 'delete' | 'get-all' | 'get'

export type UserFields = 'User' | User

export type UserSubject = [ UserActions, UserFields ]