import { z } from 'zod'

export namespace CreateReplicaRequest {
    
    export const Schema = z.object({
        Body: z.object({
            available: z.boolean(),
            bookId: z.string(),
            code: z.number()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace DeleteReplicaByCodeRequest {

    export const Schema = z.object({
        Params: z.object({
            code: z.coerce.number()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace GetReplicaByCodeRequest {

    export const Schema = z.object({
        Params: z.object({
            code: z.coerce.number()
        })
    })

    export type Type = z.infer<typeof Schema>

}

export namespace GetReplicasByBookIdRequest {

    export const Schema = z.object({
        Params: z.object({
            id: z.string()
        })
    })

    export type Type = z.infer<typeof Schema>

}