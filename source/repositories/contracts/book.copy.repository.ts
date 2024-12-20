import { BookCopy } from '@models'

export interface BookCopyRepository {
    deleteAllByBookId(bookId: string): Promise<Array<BookCopy>>
    deleteByCode(code: number): Promise<BookCopy | void>
    findByCode(code: number): Promise<BookCopy | void>
    save(bookCopy: BookCopy): Promise<void>
}