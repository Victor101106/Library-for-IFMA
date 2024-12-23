import { z } from 'zod'

export namespace AssignAdminRoleToUserRequest {
    
    export const Schema = z.object({
        Params: z.object({
            userId: z.string()
        })
    })
    
    export type Type = z.infer<typeof Schema>

}