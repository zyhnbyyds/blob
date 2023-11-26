import type { H3Event } from 'h3'

/**
 * nitro hook event handle
 * @param event h3 event type
 * @returns
 */
export function handleNitroHookEvent(event: H3Event) {
  const { path, method } = event
  const status = getResponseStatus(event)
  const dateNow = new Date().toLocaleString()

  return {
    path: decodeURIComponent(path),
    method,
    status,
    dateNow,
  }
}
