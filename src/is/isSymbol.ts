/**
 * 类型守卫，判断给定的值是否为 `Symbol` 类型
 * @param value 要判断的值
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}
