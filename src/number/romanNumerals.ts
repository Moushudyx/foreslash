import { decimalNotation } from './decimalNotation'
// \u0305
/**
 * 将一个数字转换为罗马数字, 罗马数字没有 `0`、小数和负数
 * @param num 需要转换的数字
 * @param options 格式化配置\
 * `type` 类型, 默认为 `unicode`, 以数字 `4090` 为例
 *   - `'unicode'` 使用 Unicode 表示 `'I̅V̅XC'`
 *   - `'js'` 适合用于 JavaScript 代码字符串 `'I\\u0305V\\u0305XC'`
 *   - `'html'` 适合用于 HTML 展示的字符串 `'I&#x0305;V&#x0305;XC'`
 *   - `'json'` 一个 JSON 字符串, 具体数值是下标^1000 `['XC', 'IV']`
 *
 * `thousand` 千分位类型, 默认为 `normal`
 *   - `'normal'` 超过 3999 的部分才使用上划线区分
 *   - `'strict'` 严格区分千分位
 *
 * `zero` 用什么字符串表示 `0` (罗马数字里没有 `0`), 不填默认为 `'0'`\
 * `one` 用什么字符串表示 `1` (罗马数字里可能写作 `Yo`), 不填默认为 `'I'`
 * @returns 返回一个罗马数字表示的数字
 * @example
 * ```js
 * ```
 * @version 0.3.3
 */
export function romanNumerals(
  num: string | number,
  options?: {
    type?: 'unicode' | 'exp' | 'js' | 'code' | 'html' | 'json'
    thousand?: 'normal' | 'strict'
    zero?: string
    one?: string
  }
) {
  const str = decimalNotation(num)
  if (/NaN|Inf/.test(str)) return str
  const type = (options || {}).type || 'unicode'
  const thousand = (options || {}).thousand || 'normal'
  const [integer] = str.split('.')
  // 特殊处理 0 和 1
  if (integer === '0') {
    const zero = (options || {}).zero || '0'
    if (type === 'json') return `['${zero}']`
    else return zero
  }
  if (integer === '1') {
    const one = (options || {}).one || 'I'
    if (type === 'json') return `['${one}']`
    else return one
  }
  // TODO
}
/** 标准处理, 数字转罗马数字 */
function number2roman(num: number) {
  const symbols = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ] as const
  let roman = ''
  for (const [val, str] of symbols) {
    while (num >= val) {
      num -= val
      roman += str
    }
    if (num == 0) break
  }
  return roman
}
