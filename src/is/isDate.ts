import { getTag } from '../utils'
import { isObject } from './isObject'

/**
 * 类型守卫，判断给定的值是否为 `Date`
 * @param value 要判断的值
 * @example
 * ```js
 * isDate(new Date()) // true
 * isDate(new Date(123456789)) // true
 * isDate(Date.now()) // false
 * isDate(Date) // false
 * isDate({}) // false
 * ```
 * @version 0.2.0
 */
export function isDate(value: unknown): value is Date {
  return isObject(value) && getTag(value) === 'Date'
}
