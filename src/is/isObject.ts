/**
 * 类型守卫，判断给定的值是否为对象(不是 `null`)
 * @param value 要判断的值
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
}
