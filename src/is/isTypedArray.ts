import { getTag } from '../utils'
import { isObject } from './isObject'

const allTypedArrayTags = /*#__PURE__*/ new Set([
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
  'Float32Array',
  'Float64Array',
  'BigInt64Array',
  'BigUint64Array',
])
export type TypedArray =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
/**
 * 类型守卫，判断给定的值是否为 `TypedArray` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isTypedArray(new Int8Array([1, 2, 3])) // true
 * isTypedArray(new Uint8Array([1, 2, 3])) // true
 * isTypedArray([1, 2, 3]) // false
 * isTypedArray(new ArrayBuffer(8)) // false
 * ```
 */
export function isTypedArray(value: unknown): value is TypedArray {
  return isObject(value) && allTypedArrayTags.has(getTag(value))
}
/**
 * 类型守卫，判断给定的值是否为 `Int8Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isInt8Array(new Int8Array([1, 2, 3])) // true
 * isInt8Array(new Uint8Array([1, 2, 3])) // false
 * isInt8Array([1, 2, 3]) // false
 * isInt8Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isInt8Array(value: unknown): value is Int8Array {
  return isObject(value) && getTag(value) === 'Int8Array'
}
/**
 * 类型守卫，判断给定的值是否为 `Int16Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isInt16Array(new Int16Array([1, 2, 3])) // true
 * isInt16Array(new Uint8Array([1, 2, 3])) // false
 * isInt16Array([1, 2, 3]) // false
 * isInt16Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isInt16Array(value: unknown): value is Int16Array {
  return isObject(value) && getTag(value) === 'Int16Array'
}
/**
 * 类型守卫，判断给定的值是否为 `Int32Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isInt32Array(new Int32Array([1, 2, 3])) // true
 * isInt32Array(new Uint8Array([1, 2, 3])) // false
 * isInt32Array([1, 2, 3]) // false
 * isInt32Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isInt32Array(value: unknown): value is Int32Array {
  return isObject(value) && getTag(value) === 'Int32Array'
}
/**
 * 类型守卫，判断给定的值是否为 `Uint8Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isUint8Array(new Uint8Array([1, 2, 3])) // true
 * isUint8Array(new Int8Array([1, 2, 3])) // false
 * isUint8Array([1, 2, 3]) // false
 * isUint8Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isUint8Array(value: unknown): value is Uint8Array {
  return isObject(value) && getTag(value) === 'Uint8Array'
}
/**
 * 类型守卫，判断给定的值是否为 `Uint8ClampedArray` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isUint8ClampedArray(new Uint8ClampedArray([1, 2, 3])) // true
 * isUint8ClampedArray(new Uint8Array([1, 2, 3])) // false
 * isUint8ClampedArray([1, 2, 3]) // false
 * isUint8ClampedArray(new ArrayBuffer(8)) // false
 * ```
 */
export function isUint8ClampedArray(value: unknown): value is Uint8ClampedArray {
  return isObject(value) && getTag(value) === 'Uint8ClampedArray'
}
/**
 * 类型守卫，判断给定的值是否为 `Uint16Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isUint16Array(new Uint16Array([1, 2, 3])) // true
 * isUint16Array(new Uint8Array([1, 2, 3])) // false
 * isUint16Array([1, 2, 3]) // false
 * isUint16Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isUint16Array(value: unknown): value is Uint16Array {
  return isObject(value) && getTag(value) === 'Uint16Array'
}
/**
 * 类型守卫，判断给定的值是否为 `Uint32Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isUint32Array(new Uint32Array([1, 2, 3])) // true
 * isUint32Array(new Uint8Array([1, 2, 3])) // false
 * isUint32Array([1, 2, 3]) // false
 * isUint32Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isUint32Array(value: unknown): value is Uint32Array {
  return isObject(value) && getTag(value) === 'Uint32Array'
}
/**
 * 类型守卫，判断给定的值是否为 `Float32Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isFloat32Array(new Float32Array([1, 2, 3])) // true
 * isFloat32Array(new Uint8Array([1, 2, 3])) // false
 * isFloat32Array([1, 2, 3]) // false
 * isFloat32Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isFloat32Array(value: unknown): value is Float32Array {
  return isObject(value) && getTag(value) === 'Float32Array'
}
/**
 * 类型守卫，判断给定的值是否为 `Float64Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isFloat64Array(new Float64Array([1, 2, 3])) // true
 * isFloat64Array(new Uint8Array([1, 2, 3])) // false
 * isFloat64Array([1, 2, 3]) // false
 * isFloat64Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isFloat64Array(value: unknown): value is Float64Array {
  return isObject(value) && getTag(value) === 'Float64Array'
}
/**
 * 类型守卫，判断给定的值是否为 `BigInt64Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isBigInt64Array(new BigInt64Array([1n, 2n, 3n])) // true
 * isBigInt64Array(new Uint8Array([1, 2, 3])) // false
 * isBigInt64Array([1, 2, 3]) // false
 * isBigInt64Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isBigInt64Array(value: unknown): value is BigInt64Array {
  return isObject(value) && getTag(value) === 'BigInt64Array'
}
/**
 * 类型守卫，判断给定的值是否为 `BigUint64Array` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isBigUint64Array(new BigUint64Array([1n, 2n, 3n])) // true
 * isBigUint64Array(new Uint8Array([1, 2, 3])) // false
 * isBigUint64Array([1, 2, 3]) // false
 * isBigUint64Array(new ArrayBuffer(8)) // false
 * ```
 */
export function isBigUint64Array(value: unknown): value is BigUint64Array {
  return isObject(value) && getTag(value) === 'BigUint64Array'
}
