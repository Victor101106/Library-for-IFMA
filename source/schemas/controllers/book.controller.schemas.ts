import { z } from 'zod'

export namespace CreateBookRequest {
    
    export const Schema = z.object({
        Body: z.object({
            picture: z.string().url().optional(),
            subject: z.string(),
            author: z.string(),
            genre: z.string(),
            title: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace DeleteBookRequest {

    export const Schema = z.object({
        Params: z.object({
            id: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace GetBookByIdRequest {

    export const Schema = z.object({
        Params: z.object({
            id: z.string()
        })
    })

    export type Type = z.infer<typeof Schema>

}

export namespace UpdateBookRequest {

    export const Schema = z.object({
        Body: z.object({
            picture: z.string().url().optional(),
            subject: z.string().optional(),
            author: z.string().optional(),
            genre: z.string().optional(),
            title: z.string().optional()
        }),
        Params: z.object({
            id: z.string()
        })
    })

    export type Type = z.infer<typeof Schema>

}