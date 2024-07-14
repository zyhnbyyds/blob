import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const CreateUserSchema = z.object({
  nick: z.string().nullable().optional(),
  email: z.string().email(),
  roles: z.string(), // 假设角色是字符串ID
})
