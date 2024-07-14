import { z } from 'zod'

export const CreatePermissionSchema = z.object({
  permissionName: z.string(),
  permissionKey: z.string(),
  permissionDesc: z.string(),
  id: z.number(),
  createTime: z.string(),
  updateTime: z.string(),
  isDelete: z.boolean(),
})

export const UpdatePermissionSchema = z.object({
  permissionName: z.string().optional(),
  permissionKey: z.string().optional(),
  permissionDesc: z.string().optional(),
  updateTime: z.string(),
  isDelete: z.boolean().optional(),
})

export const DeletePermissionSchema = z.object({
  id: z.number(),
})
