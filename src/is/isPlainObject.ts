import { isFunction } from "./isFunction"

const fnToString = /*#__PURE__*/ Function.prototype.toString
const objProtoContString = /*#__PURE__*/ fnToString.call(Object.prototype.constructor)
/**
 * 类型守卫，判断给定的值是否为普通对象(不是 `Date`、数组等特殊对象)
 * - 注意，与 lodash 的同名方法不同，不会将函数视为对象
 * @param value 要判断的值
 * @example
 * ```js
 * isObject({}) // true
 * isObject(Object.create(null)) // true
 * isObject([]) // false
 * isObject(Object(123)) // false
 * isObject(null) // false
 * ```
 */
export function isPlainObject(value: unknown): value is object {
  if (typeof value !== 'object' || value === null) return false
  const prototype = Object.getPrototypeOf(value)
  if (prototype === null) return true // 匹配 Object.create(null)
  // prototype 被篡改
  if (!Object.prototype.hasOwnProperty.call(prototype, "constructor")) return false
  const constructorFn = prototype.constructor
  // constructor 被篡改
  if (!isFunction(constructorFn) || fnToString.call(constructorFn) !== objProtoContString) return false
  // 检查层级深度
  return (
    Object.getPrototypeOf(prototype) === null
  )
}
