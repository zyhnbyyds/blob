import { Buffer } from 'node:buffer'

export function stringToBase64(str: string) {
  return Buffer.from(str).toString('base64')
}
