import { Id, Timestamp } from './index'

export namespace CartItem {
    export type Request = {
        bookId : string
        userId : string
    }
    export type DTO = Request & {
        createdAt: number
    }
    export type Response = CartItem
}

export class CartItem {

    private constructor (
        public readonly createdAt: Timestamp,
        public readonly bookId   : Id,
        public readonly userId   : Id
    ) {}

    public static create(request: CartItem.Request): CartItem.Response {

        const createdAt = Timestamp.create()

        const bookId = Id.create(request.bookId)
        const userId = Id.create(request.userId)
        
        return new CartItem(createdAt, bookId, userId)

    }

    public static with(data: CartItem.DTO): CartItem.Response {
        
        const createdAt = Timestamp.with(data.createdAt)
        const bookId    = Id       .with(data.bookId)
        const userId    = Id       .with(data.userId)
        
        return new CartItem(createdAt, bookId, userId)

    }

    public to(): CartItem.DTO {

        const createdAt = this.createdAt.to()
        const bookId    = this.bookId   .to()
        const userId    = this.userId   .to()

        return { createdAt, bookId, userId }

    }

}