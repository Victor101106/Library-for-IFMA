import { Book } from '@models'

export interface BookRepository {
    deleteByCode(code: number): Promise<Book | void>
    findByCode(code: number): Promise<Book | void>
    findById(id: string): Promise<Book | void>
    update(book: Book): Promise<void>
    save(book: Book): Promise<void>
}