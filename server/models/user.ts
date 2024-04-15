import { Schema } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export const UserSchema = defineMongooseModel('User', {
  username: {
    type: String,
    required: true,
  },
  password: {
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
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
})
