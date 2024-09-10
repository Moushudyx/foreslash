/**
 * 类型守卫，判断给定的值是否为布尔类型
 * @param value 要判断的值
 * @example
 * ```js
 * isBoolean(true) // true
 * isBoolean(Boolean(0)) // true
 * isBoolean('true') // false
 * isBoolean(Object(false)) // false
 * ```
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}
