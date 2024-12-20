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

}

export const inMemoryBookCopyRepository = InMemoryBookCopyRepository.create()