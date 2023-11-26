/**
 * @description pagination common type
 * @example { size: 10, page: 1 }
 */
export type Page<K> = {
  size: number
  page: number
} & K

/**
 * @description pagination response type
 * @example { total: 100, list: [], page: 1, size: 10, isAll: false }
 */
export type PageRes<T, R = any> = {
  total: number
  list: T[]
  page: number
  size: number
  /** is load all */
  isAll: boolean
} & R
