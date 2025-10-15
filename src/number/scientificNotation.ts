import { isNumber } from '../is'
import { clamp } from './clamp'
import { decimalNotation } from './decimalNotation'
import { roundBank, roundBase, roundCeil, roundFloor } from './round'
// unicode 上标 ⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻
// unicode 特殊字符 ±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≤≥∞∵∴
/**
 * 将一个数字转换为科学计数法
 * @param num 需要转换的数字
 * @param options 格式化配置\
 * `type` 类型, 默认为 `unicode`
 *   - `'unicode'` 指数部分使用 Unicode 表示 `1.23×10⁴⁵⁶`
 *   - `'exp'` 用指数表示法, 用 `e` 替换 `×10` 部分 `1.23e+456`
 *   - `'js'` 适合用于 JavaScript 的算式 `1.23*10**456`
 *   - `'code'` 适合用于其他计算机语言的算式 `1.23*10^456`
 *   - `'html'` 适合用于 HTML 展示的字符串 `1.23&#x00d7;10<sup>456</sup>`
 *   - `'json'` 一个 JSON 字符串, 可以自由处理 `{"number":1.23,"exp":456}`
 *
 * `precision` 小数精度, 默认不作数值修约\
 * `round` 数值修约规则
 *   - `'round'` 四舍五入
 *   - `'banker'` 四舍六入五成双
 *   - `'floor'` 向下取整
 *   - `'ceil'` 向上取整
 * @returns 返回一个科学计数法表示的数字
 * @example
 * ```js
 * scientificNotation(1e12) // 1×10¹²
 * scientificNotation(-2.33e-8) // -2.33×10⁻⁸
 * // 可以指定输出类型
 * scientificNotation(1.234e-6, { type: 'exp' }) // 1.234e-6
 * scientificNotation(1.234e6, { type: 'exp' }) // 1.234e+6
 * scientificNotation(6.534e-6, { type: 'code' }) // 6.534*10^-6
 * scientificNotation(6.534e6, { type: 'code' }) // 6.534*10^6
 * scientificNotation(-4.321e-8, { type: 'html' }) // -4.321&#x00d7;10<sup>-8</sup>
 * scientificNotation(-4.321e8, { type: 'html' }) // -4.321&#x00d7;10<sup>8</sup>
 * scientificNotation(-9.87e-9, { type: 'json' }) // {"number":"-9.87","exp":-9}
 * scientificNotation(-9.87e9, { type: 'json' }) // {"number":"-9.87","exp":9}
 * // 可以指定小数点后的位数及数值修约规则
 * scientificNotation(1.235e6, { type: 'exp', precision: 2 }) // 1.24e+6
 * scientificNotation(6.545e-6, { type: 'code', precision: 2, round: 'banker' }) // 6.54*10^-6
 * scientificNotation(-9.87e9, { type: 'json', precision: 1, round: 'floor' }) // {"number":"-9.9","exp":9}
 * ```
 * @version 0.3.3
 */
export function scientificNotation(
  num: string | number,
  options?: {
    type?: 'unicode' | 'exp' | 'js' | 'code' | 'html' | 'json'
    precision?: number
    round?: 'round' | 'banker' | 'floor' | 'ceil'
  }
): string {
  const str = decimalNotation(num)
  if (/NaN|Inf/.test(str)) return str
  const type = (options || {}).type || 'unicode'
  const _precision = (options || {}).precision
  const precision = isNumber(_precision) ? clamp(_precision ?? 2, 0, Infinity) : null
  const round = (options || {}).round || 'round'
  let [integer, fractional] = str.split('.')
  let sign = ''
  if (/^-/.test(integer)) {
    integer = integer.substring(1)
    sign = '-'
  }
  fractional = fractional ?? ''
  // 寻找指数部分
  let exp = 0
  let n = ''
  if (integer === '0') {
    // 负指数
    exp = /^(0+)/.test(fractional) ? -(fractional.match(/^(0+)/)![0].length + 1) : -1
    ;[integer, fractional] = [fractional.slice(-exp - 1, -exp), fractional.slice(-exp)]
  } else {
    exp = integer.length - 1
    ;[integer, fractional] = [integer.slice(0, 1), integer.slice(1) + fractional]
  }
  // 处理小数部分
  // 处理可能出现进位的情况
  // 比如 '999.999' -> 保留两位小数 -> '1,000.00'
  if (isNumber(precision)) {
    if (fractional.length > precision) {
      const roundMap = { round: roundBase, banker: roundBank, floor: roundFloor, ceil: roundCeil }
      ;[integer, fractional] = (roundMap[round] || roundBase)(integer, fractional, precision, !!sign)
    } else if (fractional.length < precision) {
      fractional += '0'.repeat(precision - fractional.length)
    }
  } else {
    fractional = fractional.replace(/0+$/, '')
  }
  if ((precision === null && fractional) || (isNumber(precision) && precision > 0)) {
    n = sign + integer + '.' + fractional
  } else n = sign + integer
  // 处理输出
  switch (type) {
    case 'exp':
      // 1.234e-6 1.234e+6
      return `${n}e${exp < 0 ? '' : '+'}${exp}`
    case 'js':
      // 6.534*10**-6 6.534*10**6
      return `${n}*10**${exp}`
    case 'code':
      // 6.534*10^-6 6.534*10^6
      return `${n}*10^${exp}`
    case 'html':
      // -4.321&#x00d7;10<sup>-8</sup> -4.321&#x00d7;10<sup>8</sup>
      return `${n}&#x00d7;10<sup>${exp}</sup>`
    case 'json':
      // {"number":"-9.87","exp":-9} {"number":"-9.87","exp":9}
      return `{"number":"${n}","exp":${exp}}`
    case 'unicode':
    default:
      // -2.33×10⁻⁸ -2.33×10⁸
      return `${n}×10${transferNumberToUniCode(String(exp))}`
  }
}

function transferNumberToUniCode(n: string) {
  const strMap = { ...Array.from('⁰¹²³⁴⁵⁶⁷⁸⁹'), '-': '⁻', '+': '⁺' } as any as Record<string, string>
  return Array.from(n)
    .map((s) => (strMap[s] ? strMap[s] : s))
    .join('')
}
