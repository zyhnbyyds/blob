import zod from 'zod'

export const emailCode = zod.object({
  code: zod.string().length(6),
  email: zod.string().email(),
})
