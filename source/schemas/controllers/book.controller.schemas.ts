import { z } from 'zod'

export namespace CreateBookRequest {
    
    export const Schema = z.object({
        Body: z.object({
            coverImage: z.string().url().optional(),
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
            bookId: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace SearchBooksRequest {

    export const Schema = z.object({
        Querystring: z.object({
            page: z.coerce.number().optional(),
            query: z.string().optional()
        })
    })

    export type Type = z.infer<typeof Schema>

}

export namespace FindBookByIdRequest {

    export const Schema = z.object({
        Params: z.object({
            bookId: z.string()
        })
    })

    export type Type = z.infer<typeof Schema>

}

export namespace UpdateBookRequest {

    export const Schema = z.object({
        Body: z.object({
            coverImage: z.string().url().optional(),
            subject: z.string().optional(),
            author: z.string().optional(),
            genre: z.string().optional(),
            title: z.string().optional()
        }),
        Params: z.object({
            bookId: z.string()
        })
    })

    export type Type = z.infer<typeof Schema>

}