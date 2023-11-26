type StorageValue = null | string | number | boolean | object

export function setStorage<V extends StorageValue>(key: string, val: V) {
  return useStorage().setItem(key, val)
}

export function getStorage<R = any>(key: string): Promise<R> {
  return useStorage().getItem(key) as Promise<R>
}
