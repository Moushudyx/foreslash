/**
 * 类型守卫，判断给定的值是否为数字类型
 * @param value 要判断的值
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}
