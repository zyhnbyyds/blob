import { CreatePermissionSchema } from '~/server/config/zod/permission'

// permission add
export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body =>
    CreatePermissionSchema.safeParse(body))

  if (!result.success)
    return Err_400(result.error.format())

  const { permissionName, permissionKey, permissionDesc } = result.data

  const permission = await PermissionSchema.create({
    permissionName,
    permissionKey,
    permissionDesc,
    id: generateId(),
    createTime: dayjs(),
    updateTime: dayjs(),
    isDelete: false,
  })

  logger.info(permission)

  return {
    success: true,
    data: permission,
  }
})
