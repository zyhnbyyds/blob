import { defineMongooseModel } from '#nuxt/mongoose'

export const PermissionSchema = defineMongooseModel('Permission', {
  permissionName: {
    type: String,
    required: true,
  },
  permissionKey: {
    type: String,
    required: true,
  },
  permissionDesc: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
  },
  updateTime: {
    type: String,
    required: true,
  },
  isDelete: {
    type: Boolean,
    required: true,
  },
})
