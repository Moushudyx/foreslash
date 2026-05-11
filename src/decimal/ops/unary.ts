import type ForeNumber from '../decimal'
import type { ForeRoundMode } from '../types'

/** 复制当前实例 */
function clone(self: ForeNumber): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor(self)
}

/** 从原始值创建同构实例 */
function fromValue(self: ForeNumber, value: ConstructorParameters<typeof ForeNumber>[0]): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor(value)
}

/** 从特殊 kind 构造对应值 */
function fromKind(self: ForeNumber, kind: ForeNumber['_k']): ForeNumber {
  if (kind === 'inf') return fromValue(self, { _s: 0, _e: 0, _d: [0], _k: 'inf' })
  if (kind === '-inf') return fromValue(self, { _s: 0, _e: 0, _d: [0], _k: '-inf' })
  if (kind === 'nan') return fromValue(self, { _s: 0, _e: 0, _d: [0], _k: 'nan' })
  return fromValue(self, { _s: 0, _e: 0, _d: [0], _k: 'normal' })
}

/**
 * 取反
 */
export function negated(this: ForeNumber): ForeNumber {
  if (this._k === 'inf') return fromKind(this, '-inf')
  if (this._k === '-inf') return fromKind(this, 'inf')
  if (this._k !== 'normal') return clone(this)
  return fromValue(this, { _s: (this._s === 0 ? 0 : (this._s * -1)) as -1 | 0 | 1, _e: this._e, _d: this._d, _k: this._k })
}

/**
 * 取绝对值
 */
export function absoluteValue(this: ForeNumber): ForeNumber {
  if (this._k === '-inf') return fromKind(this, 'inf')
  if (this._k !== 'normal') return clone(this)
  return fromValue(this, { _s: this._s < 0 ? 1 : this._s, _e: this._e, _d: this._d, _k: this._k })
}

/**
 * 按小数位精度修约
 *
 * @param precision - 保留的小数位数，可为负数（修约到十/百/千位），默认 0
 * @param roundMode  - 舍入模式，默认取全局上下文 rounding
 */
export function rounded(this: ForeNumber, precision?: number, roundMode?: ForeRoundMode): ForeNumber {
  if (this._k !== 'normal' || this._s === 0) return clone(this)

  const p = precision ?? 0
  if (!Number.isFinite(p) || !Number.isInteger(p)) return clone(this)

  const Ctor = this.constructor as typeof ForeNumber
  const mode = roundMode ?? Ctor.config().rounding
  const str = this.toString()
  const isNeg = str.startsWith('-')
  const absStr = isNeg ? str.slice(1) : str

  if (p >= 0) {
    const roundedAbs = roundDecimalString(absStr, p, mode, isNeg)
    return new Ctor(isNeg && roundedAbs !== '0' ? `-${roundedAbs}` : roundedAbs)
  }

  // 负数精度：修约到十/百/千位
  const shifted = roundDecimalString(absStr, 0, mode, isNeg, -p)
  const roundedAbs = shifted === '0' ? '0' : shifted + '0'.repeat(-p)
  return new Ctor(isNeg && roundedAbs !== '0' ? `-${roundedAbs}` : roundedAbs)
}

/**
 * 对十进制字符串的小数部分执行修约
 *
 * @param absStr   - 无符号十进制字符串（可能含小数点）
 * @param places   - 保留的小数位数
 * @param mode     - 舍入模式
 * @param isNeg    - 是否为负数（影响 floor/ceil 方向）
 * @param intShift - 整数位偏移（负数精度时使用，>0 表示修约到十/百位）
 */
function roundDecimalString(
  absStr: string,
  places: number,
  mode: ForeRoundMode,
  isNeg: boolean,
  intShift = 0
): string {
  const pointIdx = absStr.indexOf('.')
  const intPart = pointIdx >= 0 ? absStr.slice(0, pointIdx) : absStr
  const fracPart = pointIdx >= 0 ? absStr.slice(pointIdx + 1) : ''

  // 将整数部分右移 intShift 位，等价于在小数部分左侧补 intShift 个零
  if (intShift > 0) {
    const shiftInt = intPart.slice(0, Math.max(0, intPart.length - intShift))
      || '0'
    const shiftFrac = intPart.slice(Math.max(0, intPart.length - intShift))
      .padStart(intShift, '0') + fracPart
    return roundDecimalString(shiftInt + '.' + shiftFrac, places, mode, isNeg)
  }

  // 无小数部分 → 补零
  if (pointIdx < 0) {
    if (places === 0) return intPart
    return `${intPart}.${'0'.repeat(places)}`
  }

  if (fracPart.length <= places) {
    return `${intPart}.${fracPart.padEnd(places, '0')}`
  }

  const keep = fracPart.slice(0, places)
  const roundingDigit = parseInt(fracPart[places], 10)
  const hasMore = fracPart.length > places + 1 &&
    fracPart.slice(places + 1).split('').some((d) => d !== '0')

  const shouldInc = shouldIncrement(roundingDigit, hasMore, keep, intPart, places, mode, isNeg)
  if (!shouldInc) {
    return places > 0 ? `${intPart}.${keep}` : intPart
  }

  // 进位传播
  const combined = intPart + keep.padEnd(places, '0')
  const incremented = incrementDecimalString(combined)
  if (places > 0) {
    const newInt = incremented.slice(0, incremented.length - places) || '0'
    const newFrac = incremented.slice(incremented.length - places)
    return `${newInt}.${newFrac}`
  }
  return incremented
}

/** 判断是否需要进位 */
function shouldIncrement(
  roundingDigit: number,
  hasMore: boolean,
  keep: string,
  intPart: string,
  places: number,
  mode: ForeRoundMode,
  isNeg: boolean
): boolean {
  const hasRemainder = roundingDigit > 0 || hasMore
  if (!hasRemainder) return false

  switch (mode) {
    case 'ceil':
      return !isNeg
    case 'floor':
      return isNeg
    case 'round':
      return roundingDigit >= 5
    case 'banker': {
      if (roundingDigit > 5) return true
      if (roundingDigit < 5) return false
      // roundingDigit === 5: 奇进偶不进
      if (hasMore) return true
      const lastKept = places > 0
        ? parseInt(keep[keep.length - 1], 10)
        : parseInt(intPart[intPart.length - 1] || '0', 10)
      return lastKept % 2 === 1
    }
    default:
      return false
  }
}

/** 十进制整数字符串自增 1（处理进位） */
function incrementDecimalString(s: string): string {
  const digits = s.split('').map((d) => parseInt(d, 10))
  let carry = 1
  for (let i = digits.length - 1; i >= 0 && carry > 0; i -= 1) {
    const sum = digits[i] + carry
    digits[i] = sum % 10
    carry = Math.floor(sum / 10)
  }
  if (carry > 0) digits.unshift(1)
  return digits.join('')
}
