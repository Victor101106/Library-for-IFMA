import { z } from 'zod'

export namespace AddBookToCartRequest {
    
    export const Schema = z.object({
        Params: z.object({
            bookId: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}