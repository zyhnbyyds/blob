type StorageValue = null | string | number | boolean | object

export function request<V extends StorageValue>(key: string, val: V) {
  return useStorage().setItem(key, val)
}
