import { Schema } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export const ArticleSchema = defineMongooseModel('Article', {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createTime: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    required: false,
  },
  updateTime: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    required: false,
  },

  isDelete: {
    type: Boolean,
    required: true,
  },
})
