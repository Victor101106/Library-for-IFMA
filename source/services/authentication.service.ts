import { failure, Result, success } from '@helpers'
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { InvalidGoogleCodeError, InvalidGoogleCredentialError } from './errors'

export namespace AuthenticationService {

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

export class AuthenticationService {

    private constructor () {}

    public static create(): AuthenticationService {
        return new AuthenticationService()
    }

    public createOAuth2Client(): AuthenticationService.CreateOAuth2Client.Response {
        return new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET_KEY,
            process.env.GOOGLE_REDIRECT_URI
        )
    }

    public generateGoogleAuthorizeURL(): AuthenticationService.GenerateGoogleAuthorizeURL.Response {

        const client = this.createOAuth2Client()

        return client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        })

    }

    public async verifyGoogleCredential(credential: AuthenticationService.VerifyGoogleCredential.Request): Promise<Result<InvalidGoogleCredentialError, AuthenticationService.VerifyGoogleCredential.Response>> {
        
        const client = this.createOAuth2Client()
        
        const ticket = await client.verifyIdToken({
            audience: process.env.GOOGLE_CLIENT_ID,
            idToken: credential
        })
        
        const payload = ticket.getPayload()
        
        if (!payload) 
            return failure(new InvalidGoogleCredentialError())
        
        return success(payload)

    }

    public async verifyGoogleCode(code: AuthenticationService.VerifyGoogleCode.Request): Promise<Result<InvalidGoogleCodeError, AuthenticationService.VerifyGoogleCode.Response>> {

        const client = this.createOAuth2Client()

        const response = await client.getToken(code)

        if (!response.tokens.id_token)
            return failure(new InvalidGoogleCodeError())

        return this.verifyGoogleCredential(response.tokens.id_token)

    }

}

export const authenticationService = AuthenticationService.create()