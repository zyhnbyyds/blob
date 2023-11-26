import type { H3Event } from 'h3'

/**
 * 404 Err
 * @param event h3 event type
 * @param errMsg error text
 * @returns error message
 */
export function Err_404(event: H3Event, errMsg: string): string {
  return Err_Common(event, errMsg, 404)
}

/**
 * 500 Err
 * @param event h3 event type
 * @param errMsg error text
 * @returns error message
 */
export function Err_500(event: H3Event, errMsg: string): string {
  return Err_Common(event, errMsg, 500)
}

/**
 * set response status & return error message
 * @param event  h3 event type
 * @param errMsg  error text
 * @param code  response status code
 * @returns error message
 */
export function Err_Common(event: H3Event, errMsg: string, code: number): string {
  setResponseStatus(event, code)
  return errMsg
}

/**
 * handle payload err & return error message
 * @param event h3 event type
 * @param code response status code
 */
export function Err_400(event: H3Event, errMsg: string): string {
  return Err_Common(event, errMsg, 400)
}
