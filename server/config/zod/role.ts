import { z } from 'zod'

export const CreateRoleSchema = z.object({
  roleName: z.string(),
  roleDesc: z.string(),
  id: z.number(),
  createTime: z.string(),
  updateTime: z.string(),
  isDelete: z.boolean(),
  permissions: z.array(z.string()),
})

export const UpdateRoleSchema = z.object({
  roleName: z.string().optional(),
  roleDesc: z.string().optional(),
  updateTime: z.string(),
  isDelete: z.boolean().optional(),
  permissions: z.array(z.string()).optional(),
})

export const DeleteRoleSchema = z.object({
  id: z.number(),
})
