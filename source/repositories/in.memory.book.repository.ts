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
    
    public async findById(id: string): Promise<Book | void> {
        return this.database.find(book => book.id.value === id)
    }

    public async update(book: Book): Promise<void> {
        
        const index = this.database.findIndex(found => found.id.value === book.id.value)

        if (index == -1)
            return

        this.database[index] = book

    }

    public async delete(id: string): Promise<Book | void> {

        const index = this.database.findIndex(book => book.id.value === id)

        if (index == -1)
            return

        return this.database.splice(index, 1)[0]

    }

}

export const inMemoryBookRepository = InMemoryBookRepository.create()