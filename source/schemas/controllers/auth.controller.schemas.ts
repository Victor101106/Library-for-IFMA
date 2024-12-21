import { z } from 'zod'

export namespace AuthenticateWithGoogleCallbackRequest {
    
    export const Schema = z.object({
        Querystring: z.object({
            code: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace AuthenticateWithGoogleRequest {

    export const Schema = z.object({
        Body: z.object({
            credential: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}

export namespace CompleteSignUpRequest {

    export const Schema = z.object({
        Body: z.union([
            z.object({
                registration: z.void(),
                siape: z.number()
            }),
            z.object({
                registration: z.string(),
                siape: z.void()
            })
        ])
    })

    export type Type = z.infer<typeof Schema>

}