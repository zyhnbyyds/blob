import { Schema } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export const RoleSchema = defineMongooseModel('Role', {
  roleName: {
    type: String,
    required: true,
  },
  roleDesc: {
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
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
})
