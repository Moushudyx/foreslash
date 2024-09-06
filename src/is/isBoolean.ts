/**
 * 类型守卫，判断给定的值是否为布尔类型
 * @param value 要判断的值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}
