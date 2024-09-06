/**
 * 类型守卫，判断给定的值是否为字符串类型
 * @param value 要判断的值
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
