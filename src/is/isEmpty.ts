import { isArrayBuffer } from './isArrayBuffer'
import { isArrayLike } from './isArrayLike'
import { isBuffer } from './isBuffer'
import { isMap } from './isMap'
// import { isObject } from './isObject'
import { isSet } from './isSet'
/**
 * 功能性函数, 检查输入的参数是否为空
 * 1. 若值为 `undefined` 和 `null` 返回 `true`
 * 2. 若值为 `""` 或 `0` 返回 `true`
 * 3. 若值为 函数 返回 `false`
 * 4. 若值为 类数组对象: `length` 为 `0` 返回 `true` 否则返回 `false`
 * 5. 若值为 `Buffer` 或 `ArrayBuffer`: `byteLength` 为 `0` 返回 `true` 否则返回 `false`
 * 6. 若值为 `Set` 或 `Map`: `size` 为 `0` 返回 `true` 否则返回 `false`
 * 7. 若值不为 原始类型: 根据 `Object.getOwnPropertyNames` 判断是否存在自身键, 若没有返回 `true` 否则返回 `false`
 * 8. 返回 `false`
 * @param value 要判断的值
 * @example
 * ```js
 * isEmpty({}) // true
 * isEmpty([]) // true
 * isEmpty(0) // true
 * isEmpty('') // true
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty(123) // false
 * isEmpty('123') // false
 * isEmpty(() => 0) // false
 * isEmpty([1]) // false
 * isEmpty({ a: 1 }) // false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  // 1. 若值为 `undefined` 和 `null` 返回 `true`
  if (value == null) return true
  // 对象类型需要特殊判断
  if (typeof value !== 'object') {
    // 2. 若值为 `""` 或 `0` 返回 `true`
    if (value === '' || value === 0) return true
    // 3. 若值为 函数 返回 `false`
    if (typeof value === 'function') return false
    // 其他情况视为非空
    return false
  } else {
    // 4. 若值为 类数组对象: `length` 为 `0` 返回 `true` 否则返回 `false`
    if (isArrayLike(value)) {
      return !value.length
    }
    // 5. 若值为 `Buffer` 或 `ArrayBuffer`: `byteLength` 为 `0` 返回 `true` 否则返回 `false`
    if (isBuffer(value) || isArrayBuffer(value)) return !value.byteLength
    // 6. 若值为 `Set` 或 `Map`: `size` 为 `0` 返回 `true` 否则返回 `false`
    if (isSet(value) || isMap(value)) return !value.size
    // 7. 若值不为 原始类型: 根据 `Object.getOwnPropertyNames` 判断是否存在自身键, 若没有返回 `true` 否则返回 `false`
    // if (isObject(value)) {
    //   for (const key in value) {
    //     if (Object.prototype.hasOwnProperty.call(value, key)) return false
    //   }
    //   return true
    // }
    return !Object.getOwnPropertyNames(value).length
  }
}
