import { z } from 'zod'

export const CartItemSchema = z.object({
    createdAt: z.number(),
    bookId: z.string(),
    userId: z.string()
})