/**
 * Email code utility functions
 * @param code code to check
 * @param email email to check
 * @returns return true if code is valid
 */
export async function checkCodeValid(code: string, email: string): Promise<boolean> {
  try {
    const res = await getStorage<{ code: string, expire: number }>(`email:${email}:code`)
    if (!code)
      return false

    if (res.code === code && res.expire > Date.now())
      return true

    return false
  }
  catch (error) {
    return false
  }
}
