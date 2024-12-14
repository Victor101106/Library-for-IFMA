import { parse, ParseOptions, serialize, SerializeOptions } from 'cookie'

const ACCESS_TOKEN_COOKIE_LIFETIME_DAYS = 30
const ACCESS_TOKEN_COOKIE_EXPIRATION_DATE = new Date(Date.now() + ACCESS_TOKEN_COOKIE_LIFETIME_DAYS * 24 * 60 * 60 * 1000)

export class CookieHelper {

    private constructor () {}

    public static create(): CookieHelper {
        return new CookieHelper()
    }

    createAccessTokenCookie(accessToken: string) {
        return this.serialize('access-token', accessToken, {
            expires: ACCESS_TOKEN_COOKIE_EXPIRATION_DATE,
            httpOnly: true,
            sameSite: true,
            secure: true,
            path: '/'
        })
    }

    serialize(name: string, value: string, options?: SerializeOptions) {
        return serialize(name, value, options)
    }

    parse(cookies: string, options?: ParseOptions) {
        return parse(cookies, options)
    }

}

export const cookieHelper = CookieHelper.create()