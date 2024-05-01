import { Schema } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export const LoggerSchema = defineMongooseModel('Logger', {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  time: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  operation: {
    type: String,
    required: true,
  },
  params: {
    type: String,
  },
  returnData: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  system: {
    type: String,
    required: true,
  },
  version: {
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
