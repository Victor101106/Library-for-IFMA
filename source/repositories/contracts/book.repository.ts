import { Book } from '@models'

export interface BookRepository {
    findById(id: string): Promise<Book | void>
    findAll(): Promise<Array<Book>>
    delete(id: string): Promise<Book | void>
    update(book: Book): Promise<void>
    save(book: Book): Promise<void>
}