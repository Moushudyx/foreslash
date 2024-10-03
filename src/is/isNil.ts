/**
 * 类型守卫，判断给定的值是否为空值`null`或`undefined`
 * @param value 要判断的值
 * @example
 * ```js
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 * isNil("") // false
 * isNil(false) // false
 * isNil(document.all) // false
 * ```
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === void 0
}

/**
 * 类型守卫，判断给定的值是否为`null`
 * @param value 要判断的值
 * @example
 * ```js
 * isNull(null) // true
 * isNull(undefined) // false
 * isNull(0) // false
 * isNull("") // false
 * isNull(false) // false
 * ```
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * 类型守卫，判断给定的值是否为`undefined`
 * @param value 要判断的值
 * @example
 * ```js
 * isUndefined(null) // false
 * isUndefined(undefined) // true
 * isUndefined(0) // false
 * isUndefined("") // false
 * isUndefined(false) // false
 * ```
 */
export function isUndefined(value: unknown): value is undefined {
  return value === void 0
}
