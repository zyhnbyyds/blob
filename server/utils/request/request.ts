import type { ListOptions } from '~/server/types'

type StorageValue = null | string | number | boolean | object

export type ItemKeys = ({ key: string, opts?: any } | string)[]

const redis = useStorage('redis')

export function setStorage<V extends StorageValue>(key: string, val: V) {
  return redis.setItem(key, val)
}

export function hasItem<R = object>(key: string): Promise<R> {
  return redis.hasItem(key) as Promise<R>
}

export function getStorage<R = object>(key: string): Promise<R> {
  return redis.getItem(key) as Promise<R>
}

export function removeStorage(key: string) {
  return redis.removeItem(key)
}

export function clearStorage() {
  return redis.clear()
}

export function setStorages<V extends StorageValue>(key: string, val: V) {
  return redis.setItem(key, val)
}
export function getStorages<R = object, E = object>(
  keys: ItemKeys,
  params?: ListOptions<E>,
): Promise<R> {
  const { page, size, excludeKeys } = params ?? { page: 1, size: 10 }
  const start = ((page ?? 1) - 1) * (size ?? 10)
  const end = start + (size ?? 10)

  const doGetFn = async (ids: ItemKeys) => {
    return new Promise((resolve, reject) => {
      Promise.all((ids ?? []).map(key => redis.getItem(key as string)))
        .then((res) => {
          let list = res
          if (excludeKeys && excludeKeys.length > 0) {
            list = res.map((item) => {
              const obj = item as any
              excludeKeys.forEach((key) => {
                delete obj[key]
              })
              return obj
            })
          }
          resolve({ list, size, page, total: keys.length } as R)
        })
        .catch((error) => {
          reject(error)
        })
    }) as Promise<R>
  }

  const pageIds = keys.slice(start, end) ?? []

  return doGetFn(pageIds)
}
