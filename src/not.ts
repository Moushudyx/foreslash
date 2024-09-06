/**
 * 取反，一般用于函数式编程
 * @param value 要取反的值
 */
export function not(value: unknown): boolean {
  return !Boolean(value)
}
