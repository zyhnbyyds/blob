// import { LoggerSchema } from "~/server/models/logger"

// // 日志创建接口，包含用户、角色、时间、ip、操作、传参、返回值、状态、地点、设备、浏览器、系统、版本
// export default defineEventHandler(async (event) => {
//   const result = await readValidatedBody(event, body => CreateLoggerSchema.safeParse(body))

//   if (!result.success)
//     return Err_400(result.error.message)

//   const { user, role, time, ip, operation, params, returnData, status, location, device, browser, system, version } = result.data

//   await LoggerSchema.create({
//     id: generateId(),
//     user,
//     role,
//     time,
//     ip,
//     operation,
//     params,
//     returnData,
//     status,
//     location,
//     device,
//     browser,
//     system,
//     version,
//     createTime: new Date().toISOString(),
//     updateTime: new Date().toISOString(),
//     isDelete: false,
//   })

//   logger.info(`create logger success`)
//   return {
//     success: true,
//     data: 'create logger success',
//   }
// }
