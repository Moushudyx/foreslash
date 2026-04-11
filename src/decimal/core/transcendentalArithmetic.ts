import type { ForeContext, ForeState } from '../types'
import { parseDecimalString } from './parse'

/**
 * 最小近似有效位数
 */
const MIN_APPROX_DIGITS = 18

/**
 * 最大近似有效位数
 */
const MAX_APPROX_DIGITS = 30

/**
 * ln10 常量
 */
const LN10 = Math.LN10

/**
 * exp 的上溢边界
 */
const EXP_OVERFLOW_THRESHOLD = 709.782712893384

/**
 * exp 的下溢边界
 */
const EXP_UNDERFLOW_THRESHOLD = -745.1332191019411

/**
 * 构造特殊值状态
 */
function createSpecialState(kind: ForeState['_k']): ForeState {
  return { _s: 0, _e: 0, _d: [0], _k: kind }
}

/**
 * 构造数值 0 的状态
 */
function zeroState(): ForeState {
  return { _s: 0, _e: 0, _d: [0], _k: 'normal' }
}

/**
 * 构造数值 1 的状态
 */
function oneState(): ForeState {
  return { _s: 1, _e: 0, _d: [1], _k: 'normal' }
}

/**
 * 获取内部值对应的十进制位数
 */
function decimalDigitLength(digits: number[]): number {
  if (!digits.length) return 1
  return digits[0].toString().length + (digits.length - 1) * 4
}

/**
 * 从 limb 数组读取前若干十进制有效位
 */
function leadingDecimalDigits(digits: number[], count: number): string {
  const joined = digits
    .map((digit, index) => (index === 0 ? String(digit) : digit.toString().padStart(4, '0')))
    .join('')
  return joined.slice(0, Math.max(1, count))
}

/**
 * 计算用于近似运算的有效位数
 */
function resolveApproxDigits(context: ForeContext): number {
  const target = Math.max(context.powerPrecision, context.precision)
  if (!Number.isFinite(target)) return MIN_APPROX_DIGITS
  const rounded = Math.trunc(target) + 6
  return Math.max(MIN_APPROX_DIGITS, Math.min(MAX_APPROX_DIGITS, rounded))
}

/**
 * 将 normal 状态转换为近似 Number
 */
function toApproxNumber(value: ForeState, context: ForeContext): number {
  const significantDigits = resolveApproxDigits(context)
  const lead = leadingDecimalDigits(value._d, significantDigits)
  const mantissa = Number.parseFloat(`${lead[0]}${lead.length > 1 ? `.${lead.slice(1)}` : ''}`)
  const exponent10 = value._e * 4 + decimalDigitLength(value._d) - 1
  return (value._s < 0 ? -1 : 1) * mantissa * 10 ** exponent10
}

/**
 * 将 Number 近似值转换回内部状态
 */
function fromApproxNumber(value: number, context: ForeContext): ForeState {
  if (Number.isNaN(value)) return createSpecialState('nan')
  if (value === Infinity) return createSpecialState('inf')
  if (value === -Infinity) return createSpecialState('-inf')
  if (Object.is(value, -0) || value === 0) return zeroState()

  const digits = resolveApproxDigits(context)
  return parseDecimalString(value.toExponential(digits))
}

/**
 * 判断状态是否为零
 */
function isZeroState(state: ForeState): boolean {
  return state._k === 'normal' && (state._s === 0 || state._d.every((digit) => digit === 0))
}

/**
 * 判断状态是否为数值 1
 */
function isOneState(state: ForeState): boolean {
  return state._k === 'normal' && state._s === 1 && state._e === 0 && state._d.length === 1 && state._d[0] === 1
}

/**
 * 自然对数前置入口
 * 当前只处理精确特殊值与定义域判断
 */
export function lnState(value: ForeState, context: ForeContext): ForeState {
  if (value._k === 'nan') return createSpecialState('nan')
  if (value._k === 'inf') return createSpecialState('inf')
  if (value._k === '-inf') return createSpecialState('nan')
  if (isZeroState(value)) return createSpecialState('-inf')
  if (value._s < 0) return createSpecialState('nan')
  if (isOneState(value)) return zeroState()

  const approximate = toApproxNumber(value, context)
  return fromApproxNumber(Math.log(approximate), context)
}

/**
 * 指数函数前置入口
 * 当前只处理精确特殊值与定义域外壳
 */
export function expState(exponent: ForeState, context: ForeContext): ForeState {
  if (exponent._k === 'nan') return createSpecialState('nan')
  if (exponent._k === 'inf') return createSpecialState('inf')
  if (exponent._k === '-inf') return zeroState()
  if (isZeroState(exponent)) return oneState()

  const x = toApproxNumber(exponent, context)
  if (x >= EXP_OVERFLOW_THRESHOLD) return createSpecialState('inf')
  if (x <= EXP_UNDERFLOW_THRESHOLD) return zeroState()

  // 先按 ln10 分解指数 再计算余项 避免直接 exp 导致不必要上溢
  const n = Math.floor(x / LN10)
  const r = x - n * LN10
  const value = Math.exp(r) * 10 ** n
  return fromApproxNumber(value, context)
}
