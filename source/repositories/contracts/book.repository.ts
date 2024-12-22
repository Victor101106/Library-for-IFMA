import { Book } from '@models'

export interface BookRepository {

    searchBooks(query?: string, page?: number): Promise<Array<Book>>

    findById(bookId: string): Promise<Book | void>

    findAll(): Promise<Array<Book>>
    
    deleteById(bookId: string): Promise<Book | void>
    
    updateOne(book: Book): Promise<void>
    
    saveOne(book: Book): Promise<void>

}