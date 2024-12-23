import { Book } from '@models'

export type BookActions = 'manage' | 'update' | 'create' | 'delete' | 'get-all' | 'get'

export type BookFields = 'Book' | Book

export type BookSubject = [ BookActions, BookFields ]