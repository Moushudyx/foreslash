/**
 * 类型守卫，判断给定的值是否为数组(使用内置的 `Array.isArray` 方法)
 * @param value 要判断的值
 * @example
 * ```js
 * isArray([]) // true
 * isArray("") // false
 * isArray({ 0: 0, length: 1 }) // false
 * ```
 */
export const isArray = /*#__PURE__*/ Array.isArray
