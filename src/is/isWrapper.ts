import { getGlobalThis } from '../utils/_globalThis'

const global = /*#__PURE__*/ getGlobalThis()

/**
 * 类型守卫，判断给定的值是否为包装对象(可能是数字、字符串、`Symbol`、布尔、`BigInt`)
 * @param value 要判断的值
 */
export function isWrapperObject(value: unknown): value is Number | String | Boolean | Symbol | BigInt {
  return (
    !!value &&
    typeof value === 'object' &&
    (isWrapperNumber(value) ||
      isWrapperBoolean(value) ||
      isWrapperString(value) ||
      isWrapperSymbol(value) ||
      isWrapperBigInt(value))
  )
}

/**
 * 类型守卫，判断给定的值是否为包装数字对象
 * @param value 要判断的值
 */
export function isWrapperNumber(value: unknown): value is Number {
  return value instanceof Number
}

/**
 * 类型守卫，判断给定的值是否为包装布尔对象
 * @param value 要判断的值
 */
export function isWrapperBoolean(value: unknown): value is Boolean {
  return value instanceof Boolean
}

/**
 * 类型守卫，判断给定的值是否为包装字符串对象
 * @param value 要判断的值
 */
export function isWrapperString(value: unknown): value is String {
  return value instanceof String
}

/**
 * 类型守卫，判断给定的值是否为包装 `Symbol` 对象
 * @param value 要判断的值
 */
export function isWrapperSymbol(value: unknown): value is Symbol {
  return !!global.Symbol && value instanceof Symbol
}

/**
 * 类型守卫，判断给定的值是否为包装 `BigInt` 对象
 * @param value 要判断的值
 */
export function isWrapperBigInt(value: unknown): value is BigInt {
  return !!global.BigInt && value instanceof BigInt
}
