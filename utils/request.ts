import type { ComputedOptions } from 'vue'
// import type { NitroFetchOptions } from 'nitropack'
import type { AsyncData, UseFetchOptions } from '#app'
import type { ApiResult } from '~/server/types'

type Payload = Record<string, any> | ComputedOptions | Ref<Record<string, any> | undefined>

export function apiGet<T>(url: string, query: Payload) {
  return request<T>(url, { method: 'GET', query })
}

export function apiPost<T>(url: string, body: Payload) {
  return request<T>(url, { method: 'POST', body })
}

export function apiPut<T>(url: string, body: Payload) {
  return request<T>(url, { method: 'PUT', body })
}

export function apiDelete<T>(url: string, body: Payload) {
  return request<T>(url, { method: 'DELETE', body })
}

export function request<T>(url: string, options?: UseFetchOptions<ApiResult<T>>): AsyncData<T, string> {
  const res = useFetch<ApiResult<T>, string>(url, { ...options, timeout: 10000 })
  const data = ref<T>()
  const error = ref<string>()
  watch(res.data, (val) => {
    data.value = val?.data
    if (val?.success === false && val?.message)
      error.value = val.message
  })

  return {
    ...res,
    data,
    error,
  } as AsyncData<T, string>
}

// export function ApiFetch<T>(url: string, options?: NitroFetchOptions<T>) {
//   return $fetch<ApiResult<T>, string>(url, options)
// }
