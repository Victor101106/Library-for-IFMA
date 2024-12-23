import { badRequest, created, forbidden, ok } from '@helpers'
import { CreateBookRequest, DeleteBookRequest, FindBookByIdRequest, SearchBooksRequest, UpdateBookRequest } from '@schemas/controllers'
import { authorizationService, AuthorizationService, bookService, BookService } from '@services'
import { FastifyReply, FastifyRequest } from 'fastify'

export class BookController {

    private constructor (
        private readonly authorizationService: AuthorizationService,
        private readonly bookService: BookService
    ) {}

    public static create(authorizationService: AuthorizationService, bookService: BookService): BookController {
        return new BookController(authorizationService, bookService)
    }

    public async createBookHandler(request: FastifyRequest<CreateBookRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('create', 'Book'))
            return forbidden(reply)
        
        const createResult = await this.bookService.createBook({
            createdBy: String(request.locals.userId),
            coverImage: request.body.coverImage,
            subject: request.body.subject,
            author: request.body.author,
            genre: request.body.genre,
            title: request.body.title,
            isbn: request.body.isbn
        })

        if (createResult.failed())
            return badRequest(reply, createResult.value)

        const bookCreated = createResult.value

        return created(reply, bookCreated.to())

    }

    public async findBookByIdHandler(request: FastifyRequest<FindBookByIdRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {
        
        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('get', 'Book'))
            return forbidden(reply)

        const findResult = await this.bookService.findBookById(request.params.bookId)

        if (findResult.failed())
            return badRequest(reply, findResult.value)

        const bookFound = findResult.value

        return ok(reply, bookFound.to())

    }

    public async updateBookHandler(request: FastifyRequest<UpdateBookRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('update', 'Book'))
            return forbidden(reply)
        
        const updateResult = await this.bookService.updateBook({ ...request.body, ...request.params })

        if (updateResult.failed())
            return badRequest(reply, updateResult.value)

        const updatedBook = updateResult.value

        return ok(reply, updatedBook.to())

    }

    public async deleteBookHandler(request: FastifyRequest<DeleteBookRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('delete', 'Book'))
            return forbidden(reply)
        
        const deleteResult = await this.bookService.deleteBook(request.params.bookId)

        if (deleteResult.failed())
            return badRequest(reply, deleteResult.value)

        const deletedBook = deleteResult.value

        return ok(reply, deletedBook.to())

    }

    public async searchBooksHandler(request: FastifyRequest<SearchBooksRequest.Type>, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('get', 'Book'))
            return forbidden(reply)

        const searchResult = await this.bookService.searchBooks({...request.query})

        if (searchResult.failed())
            return badRequest(reply, searchResult.value)

        const booksResearched = searchResult.value
        
        const booksResearchedTo = booksResearched.map(bookResearched => bookResearched.to())

        return ok(reply, booksResearchedTo)

    }

    public async findAllBooksHandler(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

        const permissionsResult = await this.authorizationService.getPermissionsByUserId(String(request.locals.userId))
        
        if (permissionsResult.failed())
            return forbidden(reply, permissionsResult.value)
        
        const permissions = permissionsResult.value

        if (permissions.cannot('get-all', 'Book'))
            return forbidden(reply)
        
        const booksFound = await this.bookService.findAllBooks()

        const booksFoundTo = booksFound.map(bookFound => bookFound.to())

        return ok(reply, booksFoundTo)

    }

}

export const bookController = BookController.create(
    authorizationService,
    bookService
)