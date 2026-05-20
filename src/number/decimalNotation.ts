import { isNumber, isString } from '../is'

type ForeNumberLike = {
  toString: () => string
  _k?: unknown
  _s?: unknown
  _e?: unknown
  _d?: unknown
}

export type DecimalNotationInput = string | number | ForeNumberLike

function isForeNumberLike(input: unknown): input is ForeNumberLike {
  if (!input || typeof input !== 'object') return false
  return typeof (input as ForeNumberLike).toString === 'function' && '_s' in (input as ForeNumberLike) && '_e' in (input as ForeNumberLike)
}

function normalizeNumericInput(input: DecimalNotationInput): string | number {
  if (isNumber(input) || isString(input)) return input
  if (isForeNumberLike(input)) return input.toString()
  return String(input)
}

/**
 * 归一化纯十进制字符串, 剥离整数部分的前导零和小数部分的尾随零
 * @param str 已确认为纯十进制格式的字符串 (匹配 /^-?\d+(?:\.\d+)?$/)
 * @internal
 */
function normalizePlainDecimal(str: string): string {
  const match = str.match(/^(-?)(\d+)(?:\.(\d+))?$/)!
  const [, sign, intPart, fracPart] = match
  // 剥离整数部分前导零，若全部为零则保留一个 '0'
  const intNorm = intPart.replace(/^0+/, '') || '0'
  if (fracPart === undefined) return sign + intNorm
  // 剥离小数部分尾随零
  const fracNorm = fracPart.replace(/0+$/, '')
  if (fracNorm === '') return sign + intNorm
  return sign + intNorm + '.' + fracNorm
}

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
export function decimalNotation(num: DecimalNotationInput): string {
  const normalized = normalizeNumericInput(num)
  // 如果是普通数字字符串, 归一化后返回
  if (isString(normalized) && /^-?\d+(?:\.\d+)?$/i.test(normalized)) return normalizePlainDecimal(normalized)
  // 其他情况走 Number 转换后处理
  const n = isNumber(normalized) ? normalized : Number(normalized)
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
