import { chunk } from '../array'
import { clamp } from './clamp'
import { decimalNotation } from './decimalNotation'
import { roundBank, roundBase, roundCeil, roundFloor } from './round'
/**
 * 将一个数字转换为指定的格式(如千分位逗号分隔)
 * @param num 需要格式化的数字
 * @param options 格式化配置\
 * - `separator` 分割符, 默认为 `','`
 * - `separate` 按位分割, 默认为 `3`
 * - `decimal` 小数点, 默认为 `'.'`
 * - `precision` 小数精度, 默认为 `2`
 * - `round` 数值修约规则
 *   - `'round'` 四舍五入
 *   - `'banker'` 四舍六入五成双
 *   - `'floor'` 向下取整
 *   - `'ceil'` 向上取整
 * @returns 返回一个指定格式的十进制数字
 * @version 0.3.2
 */
export function format(
  num: number | string,
  options?: {
    separator?: string
    separate?: number
    decimal?: string
    precision?: number
    round?: 'round' | 'banker' | 'floor' | 'ceil'
  }
) {
  const str = decimalNotation(num)
  if (/NaN|Inf/.test(str)) return str
  const separator = (options || {}).separator || ','
  const separate = clamp((options || {}).separate || 3, 1, Infinity)
  const decimal = (options || {}).decimal || '.'
  const precision = clamp((options || {}).precision ?? 2, 0, Infinity)
  const round = (options || {}).round || 'round'

  let [integer, fractional] = str.split('.')
  let sign = ''
  if (/^-/.test(integer)) {
    integer = integer.substring(1)
    sign = '-'
  }
  fractional = fractional ?? ''
  // 处理小数部分
  // 处理可能出现进位的情况
  // 比如 '999.999' -> 保留两位小数 -> '1,000.00'
  if (fractional.length > precision) {
    const roundMap = { round: roundBase, banker: roundBank, floor: roundFloor, ceil: roundCeil }
    ;[integer, fractional] = (roundMap[round] || roundBase)(integer, fractional, precision, !!sign)
  } else if (fractional.length < precision) {
    fractional += '0'.repeat(precision - fractional.length)
  }
  // 处理整数部分
  if (integer.length > separate) {
    // 反向 -> chunk 分块 -> 合并并添加分割符
    integer = chunk(Array.from(integer).reverse(), separate)
      .map((part) => part.join(''))
      .join(separator)
    // 反向
    integer = Array.from(integer).reverse().join('')
  }
  if (precision > 0) return sign + integer + decimal + fractional
  else return sign + integer
}
