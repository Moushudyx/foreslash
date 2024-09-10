/**
 * 类型守卫，判断给定的值是否为 `BigInt` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isBigInt(1n) // true
 * isBigInt(BigInt(1)) // true
 * isBigInt(1) // false
 * isBigInt(Object(1n)) // false
 * ```
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}
