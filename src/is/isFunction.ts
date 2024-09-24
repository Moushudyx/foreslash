/**
 * 类型守卫，判断给定的值是否为函数
 * - 会将构造函数也视为函数
 * @param value 要判断的值
 * @example
 * ```js
 * isFunction(function () {}) // true
 * isFunction(() => 1) // true
 * isFunction({}) // false
 * isFunction([]) // false
 * ```
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}
