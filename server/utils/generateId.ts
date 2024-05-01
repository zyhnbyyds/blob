import { Snowflake } from '~/lib/snow-flake'

/**
 * 雪花算法生成唯一id
 * @param workerId 工作id
 * @param datacenterId 数据中心id
 * @returns generateId
 */
export function generateId(workerId = 1, datacenterId = 1): string {
  return new Snowflake(workerId, datacenterId).generateId()
}
