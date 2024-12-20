import { environment } from '@configs'
import { failure, Result, success } from '@helpers'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { InvalidGoogleCodeError, InvalidGoogleCredentialError } from './errors'

export namespace AuthService {

    export namespace CreateOAuth2Client {
        export type Request = void
        export type Response = OAuth2Client
    }
    
    export namespace GenerateGoogleAuthorizeURL {
        export type Request = void
        export type Response = string
    }

    export namespace VerifyGoogleCredential {
        export type Request = string
        export type Response = TokenPayload
    }

    export namespace VerifyGoogleCode {
        export type Request = string
        export type Response = VerifyGoogleCredential.Response
    }

}

export class AuthService {

    private constructor () {}

    public static create(): AuthService {
        return new AuthService()
    }

    public createOAuth2Client(): AuthService.CreateOAuth2Client.Response {
        return new OAuth2Client(
            environment.GOOGLE_CLIENT_ID,
            environment.GOOGLE_CLIENT_SECRET_KEY,
            environment.GOOGLE_REDIRECT_URI
        )
    }

    public generateGoogleAuthorizeURL(): AuthService.GenerateGoogleAuthorizeURL.Response {

        const client = this.createOAuth2Client()

        return client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        })

    }

    public async verifyGoogleCredential(credential: AuthService.VerifyGoogleCredential.Request): Promise<Result<InvalidGoogleCredentialError, AuthService.VerifyGoogleCredential.Response>> {
        
        const client = this.createOAuth2Client()
        
        const ticket = await client.verifyIdToken({
            audience: environment.GOOGLE_CLIENT_ID,
            idToken: credential
        })
        
        const payload = ticket.getPayload()
        
        if (!payload) 
            return failure(new InvalidGoogleCredentialError())
        
        return success(payload)

    }

    public async verifyGoogleCode(code: AuthService.VerifyGoogleCode.Request): Promise<Result<InvalidGoogleCodeError, AuthService.VerifyGoogleCode.Response>> {

        const client = this.createOAuth2Client()

        const response = await client.getToken(code)

        if (!response.tokens.id_token)
            return failure(new InvalidGoogleCodeError())

        return this.verifyGoogleCredential(response.tokens.id_token)

    }

}

export const authService = AuthService.create()