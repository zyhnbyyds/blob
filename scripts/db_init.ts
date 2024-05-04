import mongoose from 'mongoose'
import { RoleSchema } from '~/server/models/role'
import { PermissionSchema } from '~/server/models/permission'
import { mongo } from '~/config/env'
import { Snowflake } from '~/lib/snow-flake'

// 连接到你的数据库
mongoose.connect(mongo.uri, { dbName: 'blob' })

// 定义一些角色和权限数据
const roles = [
  {
    roleName: 'viewer',
    roleDesc: '浏览者',
    id: new Snowflake(1, 1).generateId(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    isDelete: false,
  },
  {
    roleName: 'editor',
    roleDesc: '编辑者',
    id: new Snowflake(1, 1).generateId(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    isDelete: false,
  },
]

const permissions = [
  {
    permissionName: 'read',
    permissionDesc: '读取',
    id: new Snowflake(1, 1).generateId(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    isDelete: false,
  },
  {
    permissionName: 'write',
    permissionDesc: '写入',
    id: new Snowflake(1, 1).generateId(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    isDelete: false,
  },
  {
    permissionName: 'delete',
    permissionDesc: '删除',
    id: new Snowflake(1, 1).generateId(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    isDelete: false,
  },
  {
    permissionName: 'update',
    permissionDesc: '更新',
    id: new Snowflake(1, 1).generateId(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    isDelete: false,
  },
]

// 使用 Promise.all 来并行创建角色和权限
Promise.all([
  RoleSchema.create(roles),
  PermissionSchema.create(permissions),
])
  .then(() => {
    console.log('初始化完成')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error('初始化失败:', err)
    mongoose.connection.close()
  })
