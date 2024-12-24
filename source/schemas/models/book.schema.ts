import { z } from 'zod'

export const BookSchema = z.object({
    coverImage: z.string().optional(),
    createdAt: z.number(),
    updatedAt: z.number(),
    createdBy: z.string(),
    subject: z.string(),
    author: z.string(),
    genre: z.string(),
    title: z.string(),
    isbn: z.string(),
    id: z.string()
})