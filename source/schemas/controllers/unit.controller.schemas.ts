import { z } from 'zod'

export namespace CreateUnitRequest {
    
    export const Schema = z.object({
        Body: z.object({
            available: z.boolean(),
            code: z.number()
        }),
        Params: z.object({
            bookId: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace UpdateUnitRequest {
    
    export const Schema = z.object({
        Body: z.object({
            available: z.boolean().optional()
        }),
        Params: z.object({
            unitCode: z.coerce.number()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace DeleteUnitByCodeRequest {

    export const Schema = z.object({
        Params: z.object({
            unitCode: z.coerce.number()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace FindUnitByCodeRequest {

    export const Schema = z.object({
        Params: z.object({
            unitCode: z.coerce.number()
        })
    })

    export type Type = z.infer<typeof Schema>

}

export namespace FindUnitsByBookIdRequest {

    export const Schema = z.object({
        Params: z.object({
            bookId: z.string()
        })
    })

    export type Type = z.infer<typeof Schema>

}