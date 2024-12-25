import { z } from 'zod'

export const LoanSchema = z.object({
    confirmedBy: z.string().optional(),
    pickupTime: z.string(),
    returnTime: z.string(),
    returnedAt: z.number().optional(),
    createdAt: z.number(),
    updatedAt: z.number(),
    startsAt: z.number(),
    unitCode: z.number(),
    status: z.string(),
    endsAt: z.number(),
    userId: z.number(),
    id: z.string()
})