import { BookCopy } from '@models'

export interface BookCopyRepository {
    deleteAllByBookId(bookId: string): Promise<Array<BookCopy>>
    findManyByBookId(bookId: string): Promise<Array<BookCopy>>
    deleteByCode(code: number): Promise<BookCopy | void>
    findByCode(code: number): Promise<BookCopy | void>
    findAll(): Promise<Array<BookCopy>>
    save(bookCopy: BookCopy): Promise<void>
}