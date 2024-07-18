export default defineEventHandler(async () => {
  const roles = await RoleSchema.find({ isDelete: false })
    .sort({ createTime: -1 })
    .select('roleName roleDesc id createTime isDelete updateTime permissions')
    .exec()

  return {
    success: true,
    data: roles,
  }
})
