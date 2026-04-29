import type { ForeContext, ForeState } from '../types'
import { addStates, divideStates, multiplyStates, quantizeStateByPrecision } from './stateArithmetic'
import { isZeroDigits } from './limbMath'
import { normalizeState } from './normalize'
import { powerRealStates } from './realPowerArithmetic'

/**
 * 根号迭代额外保留的保护位
 */
const ROOT_GUARD_DIGITS = 12

/**
 * 牛顿迭代的最大轮数
 */
const ROOT_MAX_ITERATIONS = 64

/**
 * 当前支持的有理数分母上限
 */
export const MAX_RATIONAL_DENOMINATOR = 1_000_000

/**
 * 允许自动识别为有理数幂的最大小数位数
 */
const MAX_RATIONAL_DECIMAL_SCALE = 6

/**
 * 显式分数字符串的匹配规则
 */
const FRACTION_RE = /^([+-])?\s*(\d+)\s*\/(\d+)$/

/**
 * 只要出现斜杠就按分数字符串做更严格校验
 */
const FRACTION_CANDIDATE_RE = /\//

/**
 * 有理数指数的标准形态
 */
type RationalExponent = {
  numerator: number
  denominator: number
}

/**
 * 显式分数字符串的解析结果
 */
type FractionExponentStringResult =
  | { kind: 'not-fraction' }
  | { kind: 'ok'; value: RationalExponent }
  | { kind: 'invalid-format' }
  | { kind: 'zero-denominator' }
  | { kind: 'unsafe-integer' }
  | { kind: 'denominator-too-large' }

/**
 * 指数分类结果
 */
type ExponentClassification =
  | { kind: 'integer' }
  | { kind: 'rational'; value: RationalExponent }
  | { kind: 'unsupported-rational'; reason: 'decimal-scale-too-large' | 'unsafe-integer' }
  | { kind: 'real' }

/**
 * 构造特殊值状态
 */
function createSpecialState(kind: ForeState['_k']): ForeState {
  return { _s: 0, _e: 0, _d: [0], _k: kind }
}

/**
 * 构造数值 1 的状态
 */
function oneState(): ForeState {
  return { _s: 1, _e: 0, _d: [1], _k: 'normal' }
}

/**
 * 构造数值 0 的状态
 */
function zeroState(): ForeState {
  return { _s: 0, _e: 0, _d: [0], _k: 'normal' }
}

/**
 * 判断状态是否为数值零
 */
function isZeroState(state: ForeState): boolean {
  return state._k === 'normal' && (state._s === 0 || isZeroDigits(state._d))
}

/**
 * 精确比较两个内部状态是否完全一致
 */
function statesEqual(left: ForeState, right: ForeState): boolean {
  if (left._k !== right._k || left._s !== right._s || left._e !== right._e) return false
  if (left._d.length !== right._d.length) return false
  for (let i = 0; i < left._d.length; i += 1) {
    if (left._d[i] !== right._d[i]) return false
  }
  return true
}

/**
 * 将安全范围内的非负整数转换为内部状态
 */
function integerStateFromNumber(value: number): ForeState {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
    throw new Error('[ForeNumber] 仅支持安全范围内的非负整数辅助参数')
  }

  if (value === 0) return zeroState()

  const digits = String(value)
  const limbs: number[] = []
  for (let index = digits.length; index > 0; index -= 4) {
    const start = Math.max(0, index - 4)
    limbs.unshift(Number.parseInt(digits.slice(start, index), 10))
  }
  return { _s: 1, _e: 0, _d: limbs, _k: 'normal' }
}

/**
 * 将安全范围内的有符号整数转换为指数状态
 */
function integerExponentStateFromNumber(value: number): ForeState {
  if (!Number.isFinite(value) || !Number.isInteger(value) || !Number.isSafeInteger(value)) {
    throw new Error('[ForeNumber] 仅支持安全范围内的整数指数')
  }
  if (value === 0) return zeroState()
  const absolute = integerStateFromNumber(Math.abs(value))
  return value < 0 ? { ...absolute, _s: -1 } : absolute
}

/**
 * 计算内部 limb 数组对应的十进制位数
 */
function decimalDigitLength(digits: number[]): number {
  if (!digits.length || isZeroDigits(digits)) return 1
  return digits[0].toString().length + (digits.length - 1) * 4
}

/**
 * 判断状态是否表示整数
 */
function isIntegerState(state: ForeState): boolean {
  if (state._k !== 'normal') return false
  if (state._s === 0 || state._e >= 0) return true
  const needZeroCount = -state._e
  if (needZeroCount > state._d.length) return false
  for (let i = state._d.length - needZeroCount; i < state._d.length; i += 1) {
    if (state._d[i] !== 0) return false
  }
  return true
}

/**
 * 提取整数状态的万进制 digits
 */
function integerDigitsFromState(state: ForeState): number[] {
  if (state._s === 0) return [0]
  if (state._e >= 0) return state._d.concat(new Array(state._e).fill(0))
  const cut = -state._e
  const kept = state._d.slice(0, Math.max(0, state._d.length - cut))
  return kept.length ? kept : [0]
}

/**
 * 判断整数 digits 是否为零
 */
function isZeroIntegerDigits(digits: number[]): boolean {
  return isZeroDigits(digits)
}

/**
 * 判断整数 digits 是否为奇数
 */
function isOddIntegerDigits(digits: number[]): boolean {
  if (isZeroDigits(digits)) return false
  return (digits[digits.length - 1] ?? 0) % 2 === 1
}

/**
 * 将大整数 digits 除以 2
 */
function divideIntegerDigitsBy2(digits: number[]): number[] {
  const out: number[] = []
  let carry = 0
  for (let i = 0; i < digits.length; i += 1) {
    const cur = carry * 10000 + digits[i]
    out.push(Math.floor(cur / 2))
    carry = cur % 2
  }
  const firstNonZero = out.findIndex((value) => value !== 0)
  return firstNonZero >= 0 ? out.slice(firstNonZero) : [0]
}

/**
 * 构造 10 的整数幂状态
 */
function powerOfTenState(exponent10: number): ForeState {
  if (exponent10 === 0) return oneState()
  const remainder = ((exponent10 % 4) + 4) % 4
  const limbExponent = (exponent10 - remainder) / 4
  return normalizeState({
    _s: 1,
    _e: limbExponent,
    _d: [10 ** remainder],
    _k: 'normal'
  })
}

/**
 * 取状态的绝对值
 */
function absState(state: ForeState): ForeState {
  if (state._k !== 'normal') return state
  return { ...state, _s: state._s < 0 ? 1 : state._s }
}

/**
 * 构造状态的相反数
 */
function negateState(state: ForeState): ForeState {
  if (state._k === 'nan') return state
  if (state._k === 'inf') return createSpecialState('-inf')
  if (state._k === '-inf') return createSpecialState('inf')
  if (isZeroState(state)) return zeroState()
  return { ...state, _s: (state._s * -1) as -1 | 1 }
}

/**
 * 为牛顿迭代提供一个数量级合理的初始值
 */
function approximateInitialRoot(base: ForeState, degree: number): ForeState {
  if (base._k !== 'normal' || isZeroState(base)) return base

  // 先尝试用原生 number 给出一个更接近的起点
  const numberApprox = Number(base._d[0])
  if (Number.isFinite(numberApprox) && numberApprox > 0) {
    const exponent10 = base._e * 4 + decimalDigitLength(base._d) - 1
    const approx = Math.pow(numberApprox * Math.pow(10, Math.max(-300, Math.min(300, exponent10 - (base._d[0].toString().length - 1)))), 1 / degree)
    if (Number.isFinite(approx) && approx > 0) {
      const magnitude = Math.floor(exponent10 / degree)
      return multiplyStates(normalizeState({ _s: 1, _e: 0, _d: [Math.max(1, Math.floor(approx))], _k: 'normal' }), powerOfTenState(magnitude))
    }
  }

  // 回退到只按数量级估算的保守初值
  const magnitude10 = base._e * 4 + decimalDigitLength(base._d) - 1
  return powerOfTenState(Math.floor(magnitude10 / degree))
}

/**
 * 计算最大公约数
 */
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
 * 化简有理数并统一分母符号
 */
function normalizeRational(numerator: number, denominator: number): RationalExponent {
  if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator === 0) {
    throw new Error('[ForeNumber] 有理数指数必须是整数分子与非零整数分母')
  }

  const sign = denominator < 0 ? -1 : 1
  const normalizedNumerator = numerator * sign
  const normalizedDenominator = Math.abs(denominator)
  const divisor = gcd(normalizedNumerator, normalizedDenominator)
  return {
    numerator: normalizedNumerator / divisor,
    denominator: normalizedDenominator / divisor
  }
}

/**
 * 将整数 digits 安全转换为 number
 */
function parseIntegerDigitsToSafeNumber(digits: number[]): number | null {
  let value = 0
  for (let i = 0; i < digits.length; i += 1) {
    value = value * 10000 + digits[i]
    if (!Number.isSafeInteger(value)) return null
  }
  return value
}

/**
 * 解析显式分数字符串并给出明确分类
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
    value: normalizeRational(sign * numerator, denominator)
  }
}

/**
 * 兼容旧调用路径的分数字符串解析入口
 */
export function parseFractionExponentString(input: string): RationalExponent | null {
  const inspected = inspectFractionExponentString(input)
  return inspected.kind === 'ok' ? inspected.value : null
}

/**
 * 尝试把有限小数指数转换为可处理的有理数
 */
function tryConvertExponentToRational(exponent: ForeState): ExponentClassification {
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

  return {
    kind: 'rational',
    value: normalizeRational((exponent._s < 0 ? -1 : 1) * numeratorAbs, 10 ** scaleDigits)
  }
}

/**
 * 识别指数应走整数幂 有理数幂 还是保留到后续实数幂实现
 */
function classifyExponent(exponent: ForeState, rationalHint?: RationalExponent): ExponentClassification {
  if (isIntegerState(exponent)) return { kind: 'integer' }
  if (rationalHint) return { kind: 'rational', value: normalizeRational(rationalHint.numerator, rationalHint.denominator) }
  return tryConvertExponentToRational(exponent)
}

/**
 * 用较高内部精度执行小整数除法
 */
function divideBySmallInteger(state: ForeState, divisor: number, context: ForeContext): ForeState {
  return divideStates(state, integerStateFromNumber(divisor), {
    ...context,
    divisionPrecision: Math.max(context.divisionPrecision, context.powerPrecision + ROOT_GUARD_DIGITS)
  })
}

/**
 * 整数幂核心
 */
export function powerIntegerStates(base: ForeState, exponent: ForeState, context: ForeContext): ForeState {
  const exponentIsZero = exponent._k === 'normal' && exponent._s === 0

  if (base._k === 'nan') {
    return exponentIsZero ? oneState() : createSpecialState('nan')
  }
  if (exponent._k !== 'normal') return createSpecialState('nan')
  if (!isIntegerState(exponent)) {
    throw new Error('[ForeNumber] 当前仅支持整数幂，非整数幂尚未实现')
  }
  if (exponentIsZero) return oneState()

  const exponentNegative = exponent._s < 0
  const exponentAbsDigits = integerDigitsFromState({ ...exponent, _s: exponent._s < 0 ? 1 : exponent._s })

  if (base._k === 'inf' || base._k === '-inf') {
    if (exponentNegative) return zeroState()
    if (base._k === 'inf') return createSpecialState('inf')
    return isOddIntegerDigits(exponentAbsDigits) ? createSpecialState('-inf') : createSpecialState('inf')
  }

  if (isZeroState(base)) {
    if (exponentNegative) return createSpecialState('inf')
    return zeroState()
  }

  // 使用按位折半的快速幂减少乘法次数
  let result = oneState()
  let factor = base
  let expDigits = exponentAbsDigits

  while (!isZeroIntegerDigits(expDigits)) {
    if (isOddIntegerDigits(expDigits)) result = multiplyStates(result, factor)
    expDigits = divideIntegerDigitsBy2(expDigits)
    if (!isZeroIntegerDigits(expDigits)) factor = multiplyStates(factor, factor)
  }

  if (!exponentNegative) return result

  return divideStates(oneState(), result, {
    ...context,
    divisionPrecision: Math.max(0, Math.trunc(context.powerPrecision))
  })
}

/**
 * n 次方根核心
 */
export function nthRootState(base: ForeState, degree: number, context: ForeContext): ForeState {
  if (!Number.isInteger(degree) || degree <= 0) {
    throw new Error('[ForeNumber] root 的 degree 必须是正整数')
  }
  if (base._k === 'nan') return createSpecialState('nan')
  if (degree === 1) return base
  if (base._k === 'inf') return createSpecialState('inf')
  if (base._k === '-inf') return degree % 2 === 1 ? createSpecialState('-inf') : createSpecialState('nan')
  if (isZeroState(base)) return zeroState()
  if (base._s < 0 && degree % 2 === 0) return createSpecialState('nan')

  const negativeResult = base._s < 0
  const positiveBase = negativeResult ? absState(base) : base
  const internalContext: ForeContext = {
    ...context,
    precision: Math.max(context.precision, context.powerPrecision + ROOT_GUARD_DIGITS),
    divisionPrecision: Math.max(context.divisionPrecision, context.powerPrecision + ROOT_GUARD_DIGITS)
  }
  const stableContext: ForeContext = {
    ...internalContext,
    precision: Math.max(1, Math.trunc(context.powerPrecision))
  }

  // 初始值过差会拖慢收敛 先做一次数量级估计
  let current = approximateInitialRoot(positiveBase, degree)
  if (isZeroState(current)) current = oneState()

  // 牛顿迭代公式
  // x_(k+1) = ((n - 1) * x_k + a / x_k^(n - 1)) / n
  for (let iteration = 0; iteration < ROOT_MAX_ITERATIONS; iteration += 1) {
    const currentPow = powerIntegerStates(current, integerStateFromNumber(degree - 1), internalContext)
    const division = divideStates(positiveBase, currentPow, internalContext)
    const scaledCurrent = multiplyStates(current, integerStateFromNumber(degree - 1))
    const next = divideBySmallInteger(addStates(scaledCurrent, division), degree, internalContext)

    // 用稳定精度判断是否已经收敛 避免被保护位抖动影响
    const normalizedCurrent = quantizeStateByPrecision(current, stableContext)
    const normalizedNext = quantizeStateByPrecision(next, stableContext)
    if (statesEqual(normalizedCurrent, normalizedNext)) {
      return negativeResult ? negateState(normalizedNext) : normalizedNext
    }
    current = next
  }

  const quantized = quantizeStateByPrecision(current, stableContext)
  return negativeResult ? negateState(quantized) : quantized
}

/**
 * 有理数幂核心
 */
export function powerRationalStates(base: ForeState, numerator: number, denominator: number, context: ForeContext): ForeState {
  if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator <= 0) {
    throw new Error('[ForeNumber] 当前仅支持整数分子与正整数分母的有理数幂')
  }
  if (denominator > MAX_RATIONAL_DENOMINATOR) {
    throw new Error(`[ForeNumber] 当前仅支持分母不超过 ${MAX_RATIONAL_DENOMINATOR} 的有理数幂`)
  }

  const normalized = normalizeRational(numerator, denominator)
  numerator = normalized.numerator
  denominator = normalized.denominator

  if (numerator === 0) return oneState()

  // 统一转为 先做整数幂 再开分母次根
  const absNumerator = Math.abs(numerator)
  const powered = powerIntegerStates(base, integerStateFromNumber(absNumerator), context)
  const rooted = nthRootState(powered, denominator, context)
  if (numerator > 0) return rooted
  return divideStates(oneState(), rooted, {
    ...context,
    divisionPrecision: Math.max(context.divisionPrecision, context.powerPrecision)
  })
}

/**
 * 统一幂分发入口
 */
export function powerStates(base: ForeState, exponent: ForeState, context: ForeContext, rationalHint?: RationalExponent): ForeState {
  if (rationalHint) {
    const normalizedHint = normalizeRational(rationalHint.numerator, rationalHint.denominator)
    if (normalizedHint.denominator === 1) {
      return powerIntegerStates(base, integerExponentStateFromNumber(normalizedHint.numerator), context)
    }
    return powerRationalStates(base, normalizedHint.numerator, normalizedHint.denominator, context)
  }

  if (exponent._k !== 'normal') return createSpecialState('nan')

  const classification = classifyExponent(exponent, rationalHint)
  if (classification.kind === 'integer') return powerIntegerStates(base, exponent, context)
  if (classification.kind === 'rational') {
    if (classification.value.denominator === 1) {
      return powerIntegerStates(base, integerExponentStateFromNumber(classification.value.numerator), context)
    }
    return powerRationalStates(base, classification.value.numerator, classification.value.denominator, context)
  }
  if (classification.kind === 'unsupported-rational') {
    if (classification.reason === 'decimal-scale-too-large') {
      return powerRealStates(base, exponent, context)
    }
    throw new Error('[ForeNumber] 当前仅支持安全整数范围内的有理数指数')
  }
  if (classification.kind === 'real') {
    return powerRealStates(base, exponent, context)
  }

  return createSpecialState('nan')
}
