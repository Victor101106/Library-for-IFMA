import { environmentSchema } from '@schemas/configs'

const environment = environmentSchema.validate({
    GOOGLE_REDIRECT_URI_ENDPOINT: process.env.GOOGLE_REDIRECT_URI_ENDPOINT,
    GOOGLE_CLIENT_SECRET_KEY: process.env.GOOGLE_CLIENT_SECRET_KEY,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
    PORT: Number(process.env.PORT)
})

export { environment }
