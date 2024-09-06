/**
 * 类型守卫，判断给定的值是否为空值`null`或`undefined`
 * @param value 要判断的值
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null
}

/**
 * 类型守卫，判断给定的值是否为`null`
 * @param value 要判断的值
 */
export function isNull(value: unknown): value is null {
  return value === null
}

/**
 * 类型守卫，判断给定的值是否为`undefined`
 * @param value 要判断的值
 */
export function isUndefined(value: unknown): value is undefined {
  return value === void 0
}
