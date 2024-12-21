import { BookCopy } from '@models'
import { BookCopyRepository } from './contracts'

export class InMemoryBookCopyRepository implements BookCopyRepository {
    
    private constructor (
        private readonly database: Array<BookCopy>
    ) {}

    public static create(): InMemoryBookCopyRepository {
        return new InMemoryBookCopyRepository(new Array())
    }

    public async save(bookCopy: BookCopy): Promise<void> {
        this.database.push(bookCopy)
    }

    public async findByCode(code: number): Promise<BookCopy | void> {
        return this.database.find(bookCopy => bookCopy.code.value == code)
    }

    public async findAll(): Promise<Array<BookCopy>> {
        return this.database
    }

    public async findManyByBookId(bookId: string): Promise<Array<BookCopy>> {
        return this.database.filter(bookCopy => bookCopy.bookId.value == bookId)
    }

    public async deleteByCode(code: number): Promise<BookCopy | void> {

        const index = this.database.findIndex(bookCopy => bookCopy.code.value === code)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async deleteAllByBookId(bookId: string): Promise<Array<BookCopy>> {

        const bookCopies = this.database.filter(bookCopy => bookCopy.bookId.value == bookId)

        for (const bookCopy of bookCopies)
            await this.deleteByCode(bookCopy.code.value)

        return bookCopies

    }

}

export const inMemoryBookCopyRepository = InMemoryBookCopyRepository.create()