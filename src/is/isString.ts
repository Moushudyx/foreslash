/**
 * 类型守卫，判断给定的值是否为字符串类型
 * @param value 要判断的值
 * @example
 * ```js
 * isString('123') // true
 * isString(String(123)) // true
 * isString(Symbol('123')) // false
 * isString(Object('123')) // false
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
