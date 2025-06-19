import { getGlobalThis, getTag } from '../utils'
import { isObject } from './isObject'

const global = /*#__PURE__*/ getGlobalThis()
const Blob = global.Blob
/**
 * 类型守卫，判断给定的值是否为 `Blob` 对象
 * @param value 要判断的值
 * @example
 * ```js
 * isBlob(new Blob()) // true
 * isBlob(new ArrayBuffer(8)) // false
 * isBlob([1, 2, 3]) // false
 * ```
 * @version 0.3.0
 */
export function isBlob(value: any): value is Blob {
  return !!Blob && isObject(value) && getTag(value) === 'Blob'
}
