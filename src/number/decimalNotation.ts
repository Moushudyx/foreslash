import { isNumber } from '../is'
/**
 * 将一个数字转换为正常的十进制计数法
 * @param num 需要转换的数字
 * @returns 返回一个十进制计数法表示的数字
 * @example
 * ```js
 * decimalNotation(1e12) // 1000000000000
 * decimalNotation(-2.33e8) // -233000000
 * decimalNotation(1.234e-6) // 0.000001234
 * decimalNotation(-4.321e-8) // -0.00000004321
 * ```
 * @version 0.3.2
 */
export function decimalNotation(num: string | number): string {
  const n = isNumber(num) ? num : Number(num)
  if (!isFinite(n)) return String(n) // throw new Error('Invalid number parameter')
  let str = String(n)
  // 解析字符串是否含有字母 e, 如果不含则直接返回
  if (!/e/i.test(str)) return str
  // 提取信息
  const match = str.match(/^(-?)(\d+)\.?(\d*)e([+-]?)(\d+)$/)!
  // sign 尾数的符号
  // mantissaI, mantissaF 尾数的整数和小数部分
  // expSign 指数的符号
  // exponent 指数
  const [_, sign, mantissaI, mantissaF, expSign, _exponent] = match
  const exponent = Number(_exponent)
  // 区分指数符号
  let mantissa = mantissaI + mantissaF
  let dotPos = mantissaI.length
  if (expSign === '-') {
    // 负指数, 小数点左移
    const zeroCount = exponent - dotPos + 1
    // 位数不够, 补零
    if (zeroCount > 0) mantissa = '0'.repeat(zeroCount) + mantissa
    return sign + mantissa[0] + '.' + mantissa.substring(1)
  } else {
    // 正指数, 小数点右移
    const zeroCount = exponent + dotPos - mantissa.length
    // 位数不够, 补零
    if (zeroCount > 0) mantissa = mantissa + '0'.repeat(zeroCount)
    return sign + mantissa.substring(0, exponent + dotPos)
    // // 是否存在小数部分, 如果没有则不需要展示小数点
    // const needDot = mantissa.substring(exponent + dotPos).length > 0
    // if (needDot) return sign + mantissa.substring(0, exponent + dotPos) + '.' + mantissa.substring(exponent + dotPos)
    // else return sign + mantissa.substring(0, exponent + dotPos)
  }
}
