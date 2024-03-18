/**
 * Article content type
 */
export interface ArticleItem {
  title: string
  content: string
  id: number
  createTime: string
  likeCount?: number
  updateTime: string
  viewCount?: number
  isDelete: boolean
}

export interface YearArticleItem {
  _id: number
  articles: ArticleItem[]
}
