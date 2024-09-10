/**
 * 类型守卫，判断给定的值是否为 `Symbol` 类型
 * @param value 要判断的值
 * @example
 * ```js
 * isSymbol(Symbol()) // true
 * isSymbol(Symbol('123')) // true
 * isSymbol('123') // false
 * isSymbol(Object(Symbol('123'))) // false
 * ```
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}
