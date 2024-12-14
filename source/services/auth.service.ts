import { environment } from '@configs'
import { failure, Result, success } from '@helpers'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { InvalidCredentialError } from './errors'

export namespace AuthService {
    export namespace VerifyCredential {
        export type Request = string
        export type Response = TokenPayload
    }
}

export class AuthService {

    private constructor () {}

    public static create(): AuthService {
        return new AuthService()
    }

    async verifyCredential(credential: AuthService.VerifyCredential.Request): Promise<Result<InvalidCredentialError, AuthService.VerifyCredential.Response>> {
        
        const client = new OAuth2Client()
        
        const ticket = await client.verifyIdToken({
            audience: environment.GOOGLE_CLIENT_ID,
            idToken: credential
        })
        
        const payload = ticket.getPayload()
        
        if (!payload) 
            return failure(new InvalidCredentialError())
        
        return success(payload)

    }

}

export const authService = AuthService.create()