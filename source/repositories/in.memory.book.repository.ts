import { Book } from '@models'
import { BookRepository } from './contracts'

export class InMemoryBookRepository implements BookRepository {
    
    private constructor (private readonly database: Array<Book>) {}

    public static create(): InMemoryBookRepository {
        return new InMemoryBookRepository(new Array())
    }

    public async searchBooks(query?: string, page?: number): Promise<Array<Book>> {
        
        const BOOK_COUNT_PER_PAGE = 10

        const normalizedQuery = query?.trim().toLowerCase()

        const matchingBooks = this.database.filter(
            book => [book.title, book.author, book.subject, book.genre, book.isbn].some(
                attribute => attribute.value.toLowerCase().includes(normalizedQuery || '')
            )
        )

        const startIndex = (page ? page - 1 : 0) * BOOK_COUNT_PER_PAGE

        const paginatedBooks = matchingBooks.slice(startIndex, startIndex + BOOK_COUNT_PER_PAGE)

        return paginatedBooks

    }

    public async findById(bookId: string): Promise<Book | void> {
        return this.database.find(bookFound => bookFound.id.value == bookId)
    }

    public async findAll(): Promise<Array<Book>> {
        return this.database.map(bookFound => bookFound)
    }

    public async deleteById(bookId: string): Promise<Book | void> {
        
        const index = this.database.findIndex(bookFound => bookFound.id.value == bookId)

        if (index === -1)
            return

        return this.database.splice(index, 1)[0]

    }

    public async updateOne(book: Book): Promise<void> {

        const index = this.database.findIndex(bookFound => bookFound.id.value == book.id.value)

        if (index === -1)
            return

        this.database[index] = book
        
    }

    public async saveOne(book: Book): Promise<void> {
        this.database.push(book)
    }

}

export const inMemoryBookRepository = InMemoryBookRepository.create()