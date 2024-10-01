/**
 * 类型守卫，判断给定的值是否为原始类型(如字符串数字等 JS 内置的类型)
 * - 包括 `undefined` 和 `null`
 * @param value 要判断的值
 * @example
 * ```js
 * isPrimitive(123) // true
 * isPrimitive(false) // true
 * isPrimitive('123') // true
 * isPrimitive({}) // false
 * isPrimitive([]) // false
 * isPrimitive(() => 1) // false
 * isPrimitive(Object(123)) // false
 * ```
 */
export function isPrimitive(value: unknown): value is object {
  // return value == null || !['object', 'function'].includes(typeof value)
  return value == null || (typeof value !== 'object' && typeof value !== 'function')
}
