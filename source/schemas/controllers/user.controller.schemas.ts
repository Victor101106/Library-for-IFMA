import { z } from 'zod'

export namespace FindUserByIdRequest {
    
    export const Schema = z.object({
        Params: z.object({
            userId: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace UpdateUserRequest {
    
    export const Schema = z.object({
        Body: z.object({
            registration: z.string().optional(),
            picture: z.string().optional(),
            siape: z.number().optional(),
            name: z.string().optional(),
            role: z.string().optional()
        }),
        Params: z.object({
            userId: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace UpdateMeRequest {
    
    export const Schema = z.object({
        Body: z.object({
            picture: z.string().optional(),
            name: z.string().optional()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}