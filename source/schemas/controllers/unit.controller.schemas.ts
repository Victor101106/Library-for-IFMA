import { z } from 'zod'

export namespace CreateUnitRequest {
    
    export const Schema = z.object({
        Body: z.object({
            available: z.boolean(),
            bookId: z.string(),
            code: z.number()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace DeleteUnitByCodeRequest {

    export const Schema = z.object({
        Params: z.object({
            code: z.coerce.number()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace GetUnitByCodeRequest {

    export const Schema = z.object({
        Params: z.object({
            code: z.coerce.number()
        })
    })

    export type Type = z.infer<typeof Schema>

}

export namespace GetUnitsByBookIdRequest {

    export const Schema = z.object({
        Params: z.object({
            id: z.string()
        })
    })

    export type Type = z.infer<typeof Schema>

}