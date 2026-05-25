/**
 * 有理数幂核心模块
 *
 * 职责：
 * - 有理数指数解析（显式分数字符串 & 有限小数自动识别）
 * - 指数分类（整数 / 有理数 / 实数）
 * - 有理数幂计算（先整数幂 → 再开 n 次根）
 *
 * 校验边界：
 * - `inspectFractionExponentString` 是显式分数字符串的**唯一校验入口**
 * - `normalizeRational` 是所有有理数归一化的**唯一校验入口**
 * - `powerRationalStates` 接收已校验、已归一化的 `RationalExponent`，**不再重复校验**
 */

import type { ForeContext, ForeState } from '../../types'
import { divideStates } from '../stateArithmetic'
import { absState, integerStateFromNumber, isIntegerState, oneState } from '../utils'
import { parseIntegerDigitsToSafeNumber } from '../utils'
import { powerIntegerStates } from './integerPower'
import { nthRootState } from './nthRoot'

// ────────────────────── 类型 ──────────────────────

/** 有理数指数的标准形态 */
export type RationalExponent = {
  numerator: number
  denominator: number
}

/** 显式分数字符串的解析结果 */
export type FractionExponentStringResult =
  | { kind: 'not-fraction' }
  | { kind: 'ok'; value: RationalExponent }
  | { kind: 'invalid-format' }
  | { kind: 'zero-denominator' }
  | { kind: 'unsafe-integer' }
  | { kind: 'denominator-too-large' }

/** 指数分类结果 */
export type ExponentClassification =
  | { kind: 'integer' }
  | { kind: 'rational'; value: RationalExponent }
  | { kind: 'unsupported-rational'; reason: 'decimal-scale-too-large' | 'unsafe-integer' }
  | { kind: 'real' }

// ────────────────────── 常量 ──────────────────────

/** 当前支持的有理数分母上限 */
export const MAX_RATIONAL_DENOMINATOR = 1_000_000

/** 允许自动识别为有理数幂的最大小数位数 */
const MAX_RATIONAL_DECIMAL_SCALE = 6

/**
 * 自动小数识别有理数时允许的最大分母
 * 超过该阈值时转入一般实数幂路径, 避免超大 n 次根导致长时间阻塞
 */
const MAX_AUTO_RATIONAL_DENOMINATOR = 10_000

/** 显式分数字符串的匹配规则 */
const FRACTION_RE = /^([+-])?\s*(\d+)\s*\/(\d+)$/

/** 只要出现斜杠就按分数字符串做更严格校验 */
const FRACTION_CANDIDATE_RE = /\//

// ────────────────────── 有理数工具 ──────────────────────

/** 计算最大公约数 */
function gcd(a: number, b: number): number {
  let left = Math.abs(a)
  let right = Math.abs(b)
  while (right !== 0) {
    const tmp = left % right
    left = right
    right = tmp
  }
  return left || 1
}

/**
 * 化简有理数并统一分母符号\
 * 这是有理数指数**唯一的归一化校验入口**\
 * 下游函数应信任返回的 RationalExponent，不再重复校验
 */
export function normalizeRational(numerator: number, denominator: number): RationalExponent {
  // 传入的 numerator / denominator 已经过校验，无需重复校验
  // if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator === 0) {
  //   throw new Error('[ForeNumber] 有理数指数必须是整数分子与非零整数分母')
  // }

  const sign = denominator < 0 ? -1 : 1
  const normalizedNumerator = numerator * sign
  const normalizedDenominator = Math.abs(denominator)
  const divisor = gcd(normalizedNumerator, normalizedDenominator)
  return {
    numerator: normalizedNumerator / divisor,
    denominator: normalizedDenominator / divisor,
  }
}

// ────────────────────── 分数字符串解析 ──────────────────────

/**
 * 解析显式分数字符串并给出明确分类\
 * 这是显式分数字符串的**唯一校验入口**\
 * 返回 `ok` 时 value 已归一化，下游可直接信任
 */
export function inspectFractionExponentString(input: string): FractionExponentStringResult {
  const trimmed = input.trim()
  if (!FRACTION_CANDIDATE_RE.test(trimmed)) return { kind: 'not-fraction' }

  const match = trimmed.match(FRACTION_RE)
  if (!match) return { kind: 'invalid-format' }

  const sign = match[1] === '-' ? -1 : 1
  const numerator = Number.parseInt(match[2], 10)
  const denominator = Number.parseInt(match[3], 10)

  if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator)) {
    return { kind: 'unsafe-integer' }
  }
  if (denominator === 0) return { kind: 'zero-denominator' }
  if (denominator > MAX_RATIONAL_DENOMINATOR) return { kind: 'denominator-too-large' }

  return {
    kind: 'ok',
    value: normalizeRational(sign * numerator, denominator),
  }
}

// ────────────────────── 指数分类 ──────────────────────

/**
 * 尝试把有限小数指数转换为可处理的有理数
 */
export function tryConvertExponentToRational(exponent: ForeState): ExponentClassification {
  if (exponent._k !== 'normal') return { kind: 'real' }

  let scaleDigits = Math.max(0, -exponent._e * 4)
  let numeratorAbs = parseIntegerDigitsToSafeNumber(absState(exponent)._d)
  if (numeratorAbs === null) {
    return { kind: 'unsupported-rational', reason: 'unsafe-integer' }
  }

  // 折叠十进制尾零，避免像 0.12345 因内部补零被误判成高位小数
  while (scaleDigits > 0 && numeratorAbs % 10 === 0) {
    numeratorAbs = Math.floor(numeratorAbs / 10)
    scaleDigits -= 1
  }

  if (scaleDigits > MAX_RATIONAL_DECIMAL_SCALE) {
    return { kind: 'unsupported-rational', reason: 'decimal-scale-too-large' }
  }

  const denominator = 10 ** scaleDigits
  if (denominator > MAX_AUTO_RATIONAL_DENOMINATOR) {
    return { kind: 'unsupported-rational', reason: 'decimal-scale-too-large' }
  }

  return {
    kind: 'rational',
    value: normalizeRational((exponent._s < 0 ? -1 : 1) * numeratorAbs, denominator),
  }
}

/**
 * 识别指数应走整数幂、有理数幂还是保留到后续实数幂实现
 */
export function classifyExponent(exponent: ForeState): ExponentClassification {
  if (isIntegerState(exponent)) return { kind: 'integer' }
  return tryConvertExponentToRational(exponent)
}

// ────────────────────── 有理数幂核心 ──────────────────────

/**
 * 有理数幂核心
 *
 * 接收已校验、归一化的 RationalExponent, 不再重复校验分子/分母合法性\
 * 统一转为先做整数幂, 再开分母次根
 */
export function powerRationalStates(
  base: ForeState,
  rational: RationalExponent,
  context: ForeContext
): ForeState {
  if (rational.numerator === 0) return oneState()

  const absNumerator = Math.abs(rational.numerator)
  const powered = powerIntegerStates(base, integerStateFromNumber(absNumerator), context)
  const rooted = nthRootState(powered, rational.denominator, context)
  if (rational.numerator > 0) return rooted
  return divideStates(oneState(), rooted, {
    ...context,
    divisionPrecision: Math.max(context.divisionPrecision, context.powerPrecision),
  })
}
