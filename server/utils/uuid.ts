// @ts-expect-error uuid types does not exist
import { v4 as uuid } from 'uuid'

export function uuidCreate() {
  return uuid()
}
