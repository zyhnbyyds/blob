import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})
