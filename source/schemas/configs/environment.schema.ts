import { z } from 'zod'

export namespace Environment {
    
    export const Schema = z.object({
        ACCESS_TOKEN_SECRET_KEY: z.string(),
        GOOGLE_CLIENT_SECRET_KEY: z.string(),
        GOOGLE_REDIRECT_URI: z.string(),
        GOOGLE_CLIENT_ID: z.string(),
        PORT: z.string()
    })
    
    export type Type = z.infer<typeof Schema>

}