import { getGlobalThis } from '../utils/index'

const global = /*#__PURE__*/ getGlobalThis()
const ArrayBuffer = global.ArrayBuffer
/**
 * 类型守卫，判断给定的值是否为 `ArrayBuffer`
 * @param value 要判断的值
 * @example
 * ```js
 * isArrayBuffer(new ArrayBuffer(8)) // true
 * isArrayBuffer([]) // false
 * ```
 */
export function isArrayBuffer(val: unknown): val is ArrayBuffer {
  return !!ArrayBuffer && val instanceof ArrayBuffer
}
