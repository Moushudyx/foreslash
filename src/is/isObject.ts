/**
 * 类型守卫，判断给定的值是否为对象(不是 `null`)
 * - 注意，与 lodash 的同名方法不同，不会将函数视为对象
 * @param value 要判断的值
 * @example
 * ```js
 * isObject({}) // true
 * isObject([]) // true
 * isObject(Object(123)) // true
 * isObject(123) // false
 * isObject(null) // false
 * ```
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}
