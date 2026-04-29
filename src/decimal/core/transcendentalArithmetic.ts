import type { ForeContext, ForeState } from '../types'
import { parseDecimalString } from './parse'
import { divideStates, multiplyStates } from './stateArithmetic'
import {
  compareNormalAbs,
  compareNormalStates,
  createSpecialState,
  decimalDigitLength,
  integerStateFromNumber,
  isOneState,
  isZeroState,
  oneState,
  zeroState
} from './utils'

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
 * ln2 常量
 */
const LN2 = Math.LN2

/**
 * exp 的上溢边界
 */
const EXP_OVERFLOW_THRESHOLD = 709.782712893384

/**
 * exp 的下溢边界
 */
const EXP_UNDERFLOW_THRESHOLD = -745.1332191019411

/**
 * exp 上溢阈值状态
 */
const EXP_OVERFLOW_STATE = parseDecimalString(String(EXP_OVERFLOW_THRESHOLD))

/**
 * exp 下溢阈值状态
 */
const EXP_UNDERFLOW_STATE = parseDecimalString(String(EXP_UNDERFLOW_THRESHOLD))

/**
 * ln 级数的最大迭代次数
 */
const LN_MAX_ITERATIONS = 200

/**
 * exp 级数的最大迭代次数
 */
const EXP_MAX_ITERATIONS = 200

/**
 * 尾数解析时最多使用的十进制位数
 * number 在该范围外额外位数对有效精度贡献有限
 */
const MAX_MANTISSA_PARSE_DIGITS = 16

/**
 * 2^n 状态缓存
 */
const POW2_STATE_CACHE = new Map<number, ForeState>([[0, oneState()]])

/**
 * 计算 2^n 的内部状态
 */
function powerOfTwoState(n: number): ForeState {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('[ForeNumber] 2 的幂指数必须是非负整数')
  }
  const cached = POW2_STATE_CACHE.get(n)
  if (cached) return cached

  let result = oneState()
  let factor = integerStateFromNumber(2)
  let exponent = n

  // 快速幂生成 2^n，避免逐次乘法
  while (exponent > 0) {
    if (exponent % 2 === 1) result = multiplyStates(result, factor)
    exponent = Math.floor(exponent / 2)
    if (exponent > 0) factor = multiplyStates(factor, factor)
  }

  POW2_STATE_CACHE.set(n, result)
  return result
}

/**
 * 对状态执行 2^n 缩放
 */
function scaleStateByPowerOfTwo(state: ForeState, n: number, context: ForeContext): ForeState {
  if (!Number.isInteger(n) || n === 0) return state
  if (state._k !== 'normal') return state

  const abs = Math.abs(n)
  const factor = powerOfTwoState(abs)
  if (n > 0) return multiplyStates(state, factor)

  return divideStates(state, factor, {
    ...context,
    divisionPrecision: Math.max(context.divisionPrecision, context.powerPrecision + 8)
  })
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
 * 将前导十进制有效位解析为 [1, 10) 区间的尾数
 */
function mantissaFromLeadingDigits(leadingDigits: string): number {
  if (!leadingDigits.length) return 1

  // 仅解析有限位数，避免大整数累乘带来的浮点噪声
  const parsedDigits = leadingDigits.slice(0, Math.max(1, MAX_MANTISSA_PARSE_DIGITS))

  let integerValue = 0
  for (let index = 0; index < parsedDigits.length; index += 1) {
    const code = parsedDigits.charCodeAt(index)
    const digit = code - 48
    if (digit < 0 || digit > 9) continue
    integerValue = integerValue * 10 + digit
  }

  if (integerValue === 0) return 1
  const scale = 10 ** Math.max(0, parsedDigits.length - 1)
  return integerValue / scale
}

/**
 * 计算用于近似运算的有效位数
 */
function resolveApproxDigits(context: ForeContext): number {
  // 留少量保护位，降低 ln/exp 链式运算累计误差
  const target = Math.max(context.powerPrecision, context.precision)
  if (!Number.isFinite(target)) return MIN_APPROX_DIGITS
  const rounded = Math.trunc(target) + 6
  return Math.max(MIN_APPROX_DIGITS, Math.min(MAX_APPROX_DIGITS, rounded))
}

/**
 * 根据当前上下文生成级数终止阈值
 */
function resolveSeriesTolerance(context: ForeContext): number {
  const digits = resolveApproxDigits(context)
  return 10 ** -(digits + 2)
}

/**
 * 将 normal 状态转换为近似 Number
 */
function toApproxNumber(value: ForeState, context: ForeContext): number {
  const significantDigits = resolveApproxDigits(context)
  const lead = leadingDecimalDigits(value._d, significantDigits)
  // 仅用前导有效位构造尾数，避免超长字符串转换开销
  const mantissa = mantissaFromLeadingDigits(lead)
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

  // 通过科学计数法字符串回到内部状态，确保输出形态统一
  const digits = resolveApproxDigits(context)
  return parseDecimalString(value.toExponential(digits))
}

/**
 * 在 0 附近使用 atanh 形式级数近似 ln
 * ln(m) = 2 * [z + z^3/3 + z^5/5 + ...], z = (m - 1) / (m + 1)
 */
function lnAroundOneSeries(mantissa: number, context: ForeContext): number {
  const tolerance = resolveSeriesTolerance(context)
  const z = (mantissa - 1) / (mantissa + 1)
  const z2 = z * z

  let numerator = z
  let denominator = 1
  let sum = 0

  for (let index = 0; index < LN_MAX_ITERATIONS; index += 1) {
    const term = numerator / denominator
    sum += term
    if (Math.abs(term) < tolerance) break
    numerator *= z2
    denominator += 2
  }

  return 2 * sum
}

/**
 * 直接由状态估算自然对数
 */
function approximateNaturalLog(value: ForeState, context: ForeContext): number {
  const significantDigits = resolveApproxDigits(context)
  const lead = leadingDecimalDigits(value._d, significantDigits)
  const baseMantissa = mantissaFromLeadingDigits(lead)
  const exponent10 = value._e * 4 + decimalDigitLength(value._d) - 1

  // 先把尾数缩放到接近 1 的区间，降低 ln 级数收敛成本
  let mantissa = baseMantissa
  let exponent2 = 0
  while (mantissa > 1.5) {
    mantissa /= 2
    exponent2 += 1
  }
  while (mantissa < 0.75) {
    mantissa *= 2
    exponent2 -= 1
  }

  return lnAroundOneSeries(mantissa, context) + exponent2 * LN2 + exponent10 * LN10
}

/**
 * 在 0 附近使用泰勒级数近似 exp
 * exp(r) = 1 + r + r^2/2! + ...
 */
function expSeriesAroundZero(r: number, context: ForeContext): number {
  const tolerance = resolveSeriesTolerance(context)
  let sum = 1
  let term = 1

  for (let index = 1; index <= EXP_MAX_ITERATIONS; index += 1) {
    term = (term * r) / index
    sum += term
    if (Math.abs(term) < tolerance) break
  }

  return sum
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

  return fromApproxNumber(approximateNaturalLog(value, context), context)
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

  if (exponent._k === 'normal' && compareNormalStates(exponent, EXP_OVERFLOW_STATE) >= 0) {
    return createSpecialState('inf')
  }
  if (exponent._k === 'normal' && compareNormalStates(exponent, EXP_UNDERFLOW_STATE) <= 0) {
    return zeroState()
  }

  const x = toApproxNumber(exponent, context)

  // 先按 ln2 分解指数再计算余项，减小 exp 级数输入幅度
  const n = Math.round(x / LN2)
  const r = x - n * LN2
  const base = fromApproxNumber(expSeriesAroundZero(r, context), context)
  return scaleStateByPowerOfTwo(base, n, context)
}
