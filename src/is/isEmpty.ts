import { isArray } from './isArray'
import { isArrayBuffer } from './isArrayBuffer'
import { isBuffer } from './isBuffer'
import { isMap } from './isMap'
import { isObject } from './isObject'
import { isSet } from './isSet'

export function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (value === '') return true
  if (isArray(value)) {
    return !value.length
  }
  // Buffer 类型，检查 byteLength
  if (isBuffer(value) || isArrayBuffer(value)) return !value.byteLength
  // Set 和 Map 类型，检查 size
  if (isSet(value) || isMap(value)) return !value.size
  if (isObject(value)) {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        return false
      }
    }
    return true
  }
  return false
}
