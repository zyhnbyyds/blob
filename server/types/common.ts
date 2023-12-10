/**
 * @description pagination common type
 * @example { size: 10, page: 1 }
 */
export type Page<K = object> = {
  size: number
  page: number
} & K

/**
 * @description pagination response type
 * @example { total: 100, list: [], page: 1, size: 10, isAll: false }
 */
export type PageRes<T, R = object> = {
  total: number
  list: T[]
  page: number
  size: number
  /** is load all */
  isAll: boolean
} & R

export type ListOptions<E = object> = {
  /** some keys no need to response */
  excludeKeys?: string[]
} & Partial<Page> & E
