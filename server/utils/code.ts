export function codeCheckIsSame(code: string): boolean {
  const codesList = getStorage('email')

  logger.info(`codesList: ${JSON.stringify(codesList)} code: ${code}`)

  return false
}
