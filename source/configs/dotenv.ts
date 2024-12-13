import { environmentSchema } from '@schemas/configs'

const environment = environmentSchema.validate({
    PORT: Number(process.env.PORT)
})

export { environment }
