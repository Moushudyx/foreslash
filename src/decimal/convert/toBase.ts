import type ForeNumber from '../decimal'
import { divideDigits, isZeroDigits, multiplyDigitsBySmallInt, normalizeDigits } from '../core/limbMath'
import { FORE_BASE } from '../core/constants'

/**
 * 转换为二进制、八进制或十六进制字符串
 *
 * 小数位按 precision 截断，不添加进制前缀；十六进制字母使用小写。
 */
export function toBase(this: ForeNumber, radix: 2 | 8 | 16, precision = 32): string {
  if (this._k !== 'normal') return this.toString()
  if (!Number.isSafeInteger(precision) || precision < 0) {
    throw new Error('[ForeNumber] precision 必须是非负整数')
  }

  if (this._s === 0) return '0'

  let integerDigits: number[]
  let fractionalDigits: number[] = [0]
  if (this._e >= 0) {
    integerDigits = normalizeDigits(this._d.concat(new Array(this._e).fill(0)))
  } else {
    const integerLength = this._d.length + this._e
    if (integerLength > 0) {
      integerDigits = normalizeDigits(this._d.slice(0, integerLength))
      fractionalDigits = normalizeDigits(this._d.slice(integerLength))
    } else {
      integerDigits = [0]
      fractionalDigits = normalizeDigits(this._d)
    }
  }

  const integer = integerToBase(integerDigits, radix)
  const fraction = fractionToBase(fractionalDigits, this._e, radix, precision)
  const sign = this._s < 0 ? '-' : ''
  return fraction ? `${sign}${integer}.${fraction}` : `${sign}${integer}`
}

/** 将非负的万进制整数转换为目标进制 */
function integerToBase(digits: number[], radix: 2 | 8 | 16): string {
  let current = normalizeDigits(digits)
  if (isZeroDigits(current)) return '0'

  const result: string[] = []
  const divisor = [radix]
  while (!isZeroDigits(current)) {
    const { quotient, remainder } = divideDigits(current, divisor)
    result.push(remainder[0].toString(radix))
    current = quotient
  }
  return result.reverse().join('')
}

/** 将小于 1 的万进制小数按 precision 截断转换 */
function fractionToBase(
  digits: number[],
  exponent: number,
  radix: 2 | 8 | 16,
  precision: number
): string {
  if (precision === 0 || isZeroDigits(digits)) return ''

  let remainder = normalizeDigits(digits)
  const result: string[] = []
  for (let index = 0; index < precision; index += 1) {
    remainder = multiplyDigitsBySmallInt(remainder, radix)
    const integerLength = remainder.length + exponent
    let digit = 0
    if (integerLength > 0) {
      for (let limbIndex = 0; limbIndex < integerLength; limbIndex += 1) {
        digit = digit * FORE_BASE + remainder[limbIndex]
      }
      remainder = normalizeDigits(remainder.slice(integerLength))
    }

    result.push(digit.toString(radix))
    if (isZeroDigits(remainder)) break
  }

  while (result[result.length - 1] === '0') result.pop()
  return result.join('')
}
