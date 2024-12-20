import { Book } from '@models'

export interface BookRepository {
    findById(id: string): Promise<Book | void>
    delete(id: string): Promise<Book | void>
    update(book: Book): Promise<void>
    save(book: Book): Promise<void>
}