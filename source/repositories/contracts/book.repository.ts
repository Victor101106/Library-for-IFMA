import { Book } from '@models'

export interface BookRepository {
    findByCode(code: number): Promise<Book | void>
    findById(id: string): Promise<Book | void>
    save(book: Book): Promise<void>
}