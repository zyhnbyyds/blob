import z from 'zod'

export const emailCodeStatus = [
  'used',
  'unused',
] as const

export const emailCodeSchema = z.object({
  code: z.string(),
  expire: z.number(),
  status: z.union([z.literal('used'), z.literal('unused')]),
})

export type EmailCode = z.infer<typeof emailCodeSchema>

/**
 * Email code utility functions
 * @param code code to check
 * @param email email to check
 * @returns return true if code is valid
 */
export async function checkCodeValid(code: string, email: string): Promise<boolean> {
  try {
    const res = await getStorage<EmailCode>(`email:${email}:code`)
    if (!code)
      return false

    if (res.code === code && res.expire > Date.now() && res.status === 'unused') {
      setStorage<EmailCode>(`email:${email}:code`, { ...res, status: 'used' })
      return true
    }

    return false
  }
  catch (error) {
    if (typeof error === 'string') {
      logger.error(error)
    }
    else if (typeof error === 'object') {
      logger.error(JSON.stringify(error))
    }
    else {
      logger.error('Unknown error')
    }
    return false
  }
}
