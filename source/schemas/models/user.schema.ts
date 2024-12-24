import { z } from 'zod'

export const UserSchema = z.object({
    registration: z.string().optional(),
    createdAt: z.number(),
    updatedAt: z.number(),
    oAuthId: z.string(),
    picture: z.string(),
    siape: z.number().optional(),
    email: z.string(),
    role: z.string(),
    name: z.string(),
    id: z.string()
})