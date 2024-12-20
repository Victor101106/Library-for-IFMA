import { BookCopy } from '@models'

export interface BookCopyRepository {
    findByCode(code: number): Promise<BookCopy | void>
    save(bookCopy: BookCopy): Promise<void>
}