/**
 * 类型守卫，判断给定的值是否为整数数字，需要注意一下与 `isNumber` 的区别
 * @param value 要判断的值
 * @example
 * ```js
 * isInteger(123) // true
 * isInteger(12.3) // false
 * isInteger(123n) // false
 * isInteger("123") // false
 * // 需要注意一下与 `isNumber` 的区别
 * isNumber(1.23) // true
 * isInteger(1.23) // false
 * ```
 */
export function isInteger(value: unknown): value is number {
  return typeof value === 'number' && isFinite(value) && value % 1 === 0
}
