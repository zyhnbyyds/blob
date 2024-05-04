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

/**
 * Makes an asynchronous request to the specified URL.
 * @template T - The type of the response data.
 * @param {string} url - The URL to make the request to.
 * @param {UseFetchOptions<ApiResult<T>>} [options] - The options for the request.
 * @returns {AsyncData<T, string>} An object containing the response data, as well as any error that occurred.
 */
export function request<T>(url: string, options?: UseFetchOptions<ApiResult<T>>): AsyncData<T, string> {
  const res = useFetch<ApiResult<T>, string>(url, { ...options, timeout: 10000 })
  const data = ref<T>()
  const error = ref<string>()
  watchEffect(() => {
    const response = res.data.value
    data.value = response?.success ? response.data : undefined

    if (response?.success === false && response?.message)
      error.value = response.message
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
