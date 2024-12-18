import { parse, ParseOptions, serialize, SerializeOptions } from 'cookie'

export interface Cookie {
    options: SerializeOptions
    name: string
}

export const ACCESS_TOKEN_COOKIE: Cookie = {
    name: 'access-token',
    options: {
        expires: calculateCookieExpirationByDays(30),
        sameSite: true,
        httpOnly: true,
        secure: true,
        path: '/'
    }
}

export function calculateCookieExpirationByDays(days: number) {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

export function parseCookie(cookie: string, options?: ParseOptions) {
    return parse(cookie, options)
}

export function serializeCookie(cookie: Cookie, value: string) {
    return serialize(cookie.name, value, cookie.options)
}