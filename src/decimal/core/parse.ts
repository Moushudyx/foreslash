import type { ForeInput, ForeState, baseForeNumber } from '../types'
import { kindFromLegacyTag } from './kind'
import { normalizeState } from './normalize'
import { FORE_BASE_DIGITS } from './constants'

const DECIMAL_RE = /^([+-])?(\d+)(?:\.(\d*))?(?:e([+-]?\d+))?$/i

/**
 * 解析任意输入为内部状态
 */
export function parseInput(value: ForeInput): ForeState {
  if (isForeLike(value)) {
    return parseBaseForeNumber(value)
  }
  if (typeof value === 'bigint') {
    return parseDecimalString(value.toString())
  }
  if (typeof value === 'number') {
    if (Number.isNaN(value)) return { _s: 0, _e: 0, _d: [0], _k: 'nan' }
    if (value === Infinity) return { _s: 0, _e: 0, _d: [0], _k: 'inf' }
    if (value === -Infinity) return { _s: 0, _e: 0, _d: [0], _k: '-inf' }
    return parseDecimalString(String(value))
  }
  return parseDecimalString(value)
}

/**
 * 解析旧版对象结构
 */
export function parseBaseForeNumber(value: baseForeNumber): ForeState {
  const kind = kindFromLegacyTag(value._t)
  return normalizeState({
    _s: value._s,
    _e: value._e,
    _d: value._d,
    _k: kind
  })
}

/**
 * 解析十进制字符串（支持科学计数法）
 */
export function parseDecimalString(input: string): ForeState {
  const raw = input.trim()
  if (/^nan$/i.test(raw)) return { _s: 0, _e: 0, _d: [0], _k: 'nan' }
  if (/^[+]?inf(inity)?$/i.test(raw)) return { _s: 0, _e: 0, _d: [0], _k: 'inf' }
  if (/^-inf(inity)?$/i.test(raw)) return { _s: 0, _e: 0, _d: [0], _k: '-inf' }

  const m = raw.match(DECIMAL_RE)
  if (!m) return { _s: 0, _e: 0, _d: [0], _k: 'nan' }

  const sign = m[1] === '-' ? -1 : 1
  const integer = m[2] || '0'
  const fractional = m[3] || ''
  const exp10 = Number.parseInt(m[4] || '0', 10)

  let coeff = (integer + fractional).replace(/^0+/, '')
  if (!coeff) {
    return { _s: 0, _e: 0, _d: [0], _k: 'normal' }
  }

  let scale10 = fractional.length - exp10
  if (scale10 < 0) {
    coeff += '0'.repeat(-scale10)
    scale10 = 0
  }

  const pad = (FORE_BASE_DIGITS - (scale10 % FORE_BASE_DIGITS)) % FORE_BASE_DIGITS
  if (pad) coeff += '0'.repeat(pad)
  const scale4 = (scale10 + pad) / FORE_BASE_DIGITS

  const limbs = decimalDigitsToLimbs(coeff)
  return normalizeState({
    _s: sign,
    _e: -scale4,
    _d: limbs,
    _k: 'normal'
  })
}

/** 将十进制字符串按 4 位分段为 limb 数组 */
function decimalDigitsToLimbs(digits: string): number[] {
  const result: number[] = []
  for (let i = digits.length; i > 0; i -= FORE_BASE_DIGITS) {
    const start = Math.max(0, i - FORE_BASE_DIGITS)
    result.unshift(Number.parseInt(digits.slice(start, i), 10))
  }
  return result.length ? result : [0]
}

/** 判断输入是否满足旧版兼容结构 */
function isForeLike(value: ForeInput): value is baseForeNumber {
  if (!value || typeof value !== 'object') return false
  return '_s' in value && '_e' in value && '_d' in value && '_t' in value
}
