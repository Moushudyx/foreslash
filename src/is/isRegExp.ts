import { getTag } from '../utils'
import { isObject } from './isObject'

/**
 * 类型守卫，判断给定的值是否为正则表达式 `RegExp`
 * @param value 要判断的值
 * @example
 * ```js
 * isRegExp(/123/) // true
 * isRegExp(new RegExp("123")) // true
 * isRegExp("123") // false
 * ```
 */
export function isRegExp(value: unknown): value is RegExp {
  return isObject(value) && getTag(value) === 'RegExp'
}
