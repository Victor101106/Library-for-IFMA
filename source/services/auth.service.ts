import { environment } from '@configs'
import { failure, Result, success } from '@helpers'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { InvalidCredentialError } from './errors'

export class AuthService {

    private constructor () {}

    public static create(): AuthService {
        return new AuthService()
    }

    async verifyCredential(credential: string): Promise<Result<InvalidCredentialError, TokenPayload>> {
        
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