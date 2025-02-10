import { getTag } from '../utils'
import { isObject } from './isObject'

/**
 * 类型守卫，判断给定的值是否为 `DataView` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isDataView(new DataView(new ArrayBuffer(8))) // true
 * isDataView(new ArrayBuffer(8)) // false
 * isDataView([1, 2, 3]) // false
 * ```
 * @version 0.2.0
 */
export function isDataView(value: unknown): value is DataView {
  return isObject(value) && getTag(value) === 'DataView'
}
