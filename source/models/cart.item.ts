import { Id, Timestamp } from './index'

export namespace CartItem {
    export type Request = {
        bookId : string
        userId : string
    }
    export type DTO = Request & {
        createdAt: number
        updatedAt: number
        id       : string
    }
    export type Response = CartItem
}

export class CartItem {

    private constructor (
        public readonly createdAt: Timestamp,
        public readonly updatedAt: Timestamp,
        public readonly bookId   : Id,
        public readonly userId   : Id,
        public readonly id       : Id
    ) {}

    public static create(request: CartItem.Request): CartItem.Response {

        const createdAt = Timestamp.create()
        const updatedAt = Timestamp.create()

        const bookId = Id.create(request.bookId)
        const userId = Id.create(request.userId)
        const id     = Id.create()
        
        return new CartItem(createdAt, updatedAt, bookId, userId, id)

    }

    public static with(data: CartItem.DTO): CartItem.Response {
        
        const createdAt = Timestamp.with(data.createdAt)
        const updatedAt = Timestamp.with(data.updatedAt)
        const bookId    = Id       .with(data.bookId)
        const userId    = Id       .with(data.userId)
        const id        = Id       .with(data.id)
        
        return new CartItem(createdAt, updatedAt, bookId, userId, id)

    }

    public to(): CartItem.DTO {

        const createdAt = this.createdAt.to()
        const updatedAt = this.updatedAt.to()
        const bookId    = this.bookId   .to()
        const userId    = this.userId   .to()
        const id        = this.id       .to()

        return { createdAt, updatedAt, bookId, userId, id }

    }

}