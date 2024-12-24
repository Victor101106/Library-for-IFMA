import { z } from 'zod'

export const UnitSchema = z.object({
    createdAt: z.number(),
    updatedAt: z.number(),
    available: z.boolean(),
    createdBy: z.string(),
    bookId: z.string(),
    code: z.number()
})