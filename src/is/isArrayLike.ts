import { isInteger } from './isInteger'
/**
 * 类型守卫，判断给定的值是否为类数组
 * @param value 要判断的值
 * @example
 * ```js
 * isArrayLike([]) // true
 * isArrayLike("") // true
 * isArrayLike({ 0: 0, length: 1 }) // true
 * isArrayLike({ 0: 0, length: -1 }) // false
 * ```
 */
export function isArrayLike(value: unknown): value is ArrayLike<any> {
  return value != null && typeof value !== 'function' && isInteger((value as any).length) && (value as any).length >= 0
}
