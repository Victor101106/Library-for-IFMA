import { Book } from '@models'
import { BookRepository } from './contracts'

export class InMemoryBookRepository implements BookRepository {
    
    private constructor (
        private readonly database: Array<Book>
    ) {}

    public static create(): InMemoryBookRepository {
        return new InMemoryBookRepository(new Array())
    }

    public async save(book: Book): Promise<void> {
        this.database.push(book)
    }
    
    public async findByCode(code: number): Promise<Book | void> {
        return this.database.find(book => book.code.value === code)
    }

    public async findById(id: string): Promise<Book | void> {
        return this.database.find(book => book.id.value === id)
    }

    public async update(book: Book): Promise<void> {
        
        const index = this.database.findIndex(found => found.id.value === book.id.value)

        if (index == -1)
            return

        this.database[index] = book

    }

}

export const inMemoryBookRepository = InMemoryBookRepository.create()