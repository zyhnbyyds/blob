/**
 * 404 Err
 * @param errMsg error text
 * @returns error message
 */
export function Err_404(errMsg: any) {
  return Err_Common(errMsg, 404)
}

/**
 * set response status & return error message
 * @param errMsg error text
 * @param code response status code
 * @returns error message
 */
export function Err_Common(
  errMsg: any,
  code: number,
) {
  return {
    code,
    success: false,
    message: errMsg,
  }
}

/**
 * handle payload err & return error message
 * @param errMsg response status code
 */
export function Err_400(errMsg: any) {
  return Err_Common(errMsg, 400)
}
