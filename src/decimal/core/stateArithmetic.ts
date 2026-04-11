import type { ForeContext, ForeRoundMode, ForeState } from '../types'
import { normalizeState } from './normalize'
import {
  addDigits,
  compareDigits,
  divideDigits,
  incrementDigits,
  isZeroDigits,
  multiplyDigits,
  multiplyDigitsByPowerOfTen,
  multiplyDigitsBySmallInt,
  subtractDigits
} from './limbMath'

/** 除法保护位数, 用于防止除法结果精度丢失 */
const DIVISION_GUARD_DIGITS = 16

function createSpecialState(kind: ForeState['_k']): ForeState {
  return { _s: 0, _e: 0, _d: [0], _k: kind }
}

/** 获取规范化后尾数对应的十进制位数 */
function decimalDigitLength(digits: number[]): number {
  if (!digits.length || isZeroDigits(digits)) return 1
  return digits[0].toString().length + (digits.length - 1) * 4
}

/** 判断状态是否表示数值零 */
function isZeroState(state: ForeState): boolean {
  return state._k === 'normal' && (state._s === 0 || isZeroDigits(state._d))
}

/** 获取状态符号，包含无穷值 */
function signOfState(state: ForeState): -1 | 0 | 1 {
  if (state._k === '-inf') return -1
  if (state._k === 'inf') return 1
  return state._s
}

/** 将两个状态按相同指数对齐，便于做整数运算 */
function alignStates(left: ForeState, right: ForeState) {
  const exponent = Math.min(left._e, right._e)
  return {
    exponent,
    leftDigits: left._d.concat(new Array(left._e - exponent).fill(0)),
    rightDigits: right._d.concat(new Array(right._e - exponent).fill(0))
  }
}

/** 从 sign + digits + exponent 构造规范 normal 状态 */
function buildNormalState(sign: -1 | 1, digits: number[], exponent: number): ForeState {
  return normalizeState({
    _s: sign,
    _e: exponent,
    _d: digits,
    _k: 'normal'
  })
}

/** 对状态取负值 */
function negateState(state: ForeState): ForeState {
  if (state._k === 'nan') return state
  if (state._k === 'inf') return createSpecialState('-inf')
  if (state._k === '-inf') return createSpecialState('inf')
  if (isZeroState(state)) return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })
  return { ...state, _s: (state._s * -1) as -1 | 1 }
}

/** 将按十进制位放大的整数商还原为 ForeState */
function stateFromScaledInteger(sign: -1 | 1, digits: number[], decimalPlaces: number): ForeState {
  if (isZeroDigits(digits)) return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })

  const padding = (4 - (decimalPlaces % 4)) % 4
  const coefficient = multiplyDigitsByPowerOfTen(digits, padding)
  const exponent = -Math.floor((decimalPlaces + padding) / 4)
  return buildNormalState(sign, coefficient, exponent)
}

/** 判断除法结果是否需要向上修约 */
function shouldRoundUp(
  remainder: number[],
  divisor: number[],
  quotient: number[],
  sign: -1 | 1,
  roundMode: ForeRoundMode
): boolean {
  if (isZeroDigits(remainder)) return false
  if (roundMode === 'ceil') return sign > 0
  if (roundMode === 'floor') return sign < 0

  const twiceRemainder = multiplyDigitsBySmallInt(remainder, 2)
  const halfCompared = compareDigits(twiceRemainder, divisor)
  if (roundMode === 'round') return halfCompared >= 0
  if (roundMode === 'banker') {
    if (halfCompared > 0) return true
    if (halfCompared < 0) return false
    const lastDigit = quotient[quotient.length - 1] ?? 0
    return lastDigit % 2 === 1
  }
  return false
}

/** 构造数值 1 的 normal 状态 */
function oneState(): ForeState {
  return { _s: 1, _e: 0, _d: [1], _k: 'normal' }
}

/** 判断 normal 状态是否为整数 */
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

/** 将整数状态转换为非负 limb 整数（忽略符号） */
function integerDigitsFromState(state: ForeState): number[] {
  if (state._s === 0) return [0]
  if (state._e >= 0) {
    return state._d.concat(new Array(state._e).fill(0))
  }
  const cut = -state._e
  const kept = state._d.slice(0, Math.max(0, state._d.length - cut))
  return kept.length ? kept : [0]
}

/** 判断整数 limb 是否为 0 */
function isZeroIntegerDigits(digits: number[]): boolean {
  return isZeroDigits(digits)
}

/** 判断整数 limb 是否为奇数 */
function isOddIntegerDigits(digits: number[]): boolean {
  if (isZeroDigits(digits)) return false
  return (digits[digits.length - 1] ?? 0) % 2 === 1
}

/** 计算整数 limb 的 floor(d / 2) */
function divideIntegerDigitsBy2(digits: number[]): number[] {
  const out: number[] = []
  let carry = 0
  for (let i = 0; i < digits.length; i += 1) {
    const cur = carry * 10000 + digits[i]
    out.push(Math.floor(cur / 2))
    carry = cur % 2
  }
  return out.length ? out.slice(out.findIndex((n) => n !== 0) >= 0 ? out.findIndex((n) => n !== 0) : out.length - 1) : [0]
}

/**
 * 按上下文 precision 执行统一有效数字量化
 *
 * 说明：
 * - precision 表示有效数字位数
 * - 该量化与除法小数位控制（divisionPrecision）互补
 */
export function quantizeStateByPrecision(state: ForeState, context: ForeContext): ForeState {
  if (state._k !== 'normal' || isZeroState(state)) return state

  const targetPrecision = Math.trunc(context.precision)
  if (!Number.isFinite(targetPrecision) || targetPrecision <= 0) return state

  const currentDigits = decimalDigitLength(state._d)
  if (currentDigits <= targetPrecision) return state

  const cutDigits = currentDigits - targetPrecision
  const scale = multiplyDigitsByPowerOfTen([1], cutDigits)
  const divided = divideDigits(state._d, scale)
  let quotient = divided.quotient

  if (shouldRoundUp(divided.remainder, scale, quotient, state._s as -1 | 1, context.rounding)) {
    quotient = incrementDigits(quotient)
  }

  if (isZeroDigits(quotient)) {
    return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })
  }

  const limbShift = Math.floor(cutDigits / 4)
  const decimalShift = cutDigits % 4
  const coefficient = decimalShift > 0 ? multiplyDigitsByPowerOfTen(quotient, decimalShift) : quotient

  return buildNormalState(state._s as -1 | 1, coefficient, state._e + limbShift)
}

/**
 * 使用内部万进制状态执行取模\
 * 当前语义使用“截断除法余数”，与 JavaScript `%` 保持一致：余数符号与被除数一致
 */
export function moduloStates(left: ForeState, right: ForeState): ForeState {
  if (left._k === 'nan' || right._k === 'nan') return createSpecialState('nan')
  if (isZeroState(right)) return createSpecialState('nan')
  if (left._k === 'inf' || left._k === '-inf') return createSpecialState('nan')
  if (right._k === 'inf' || right._k === '-inf') return left
  if (isZeroState(left)) return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })

  const aligned = alignStates(left, right)
  const { remainder } = divideDigits(aligned.leftDigits, aligned.rightDigits)
  if (isZeroDigits(remainder)) {
    return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })
  }

  return buildNormalState(left._s as -1 | 1, remainder, aligned.exponent)
}

/**
 * 使用内部万进制状态执行加法
 */
export function addStates(left: ForeState, right: ForeState): ForeState {
  if (left._k === 'nan' || right._k === 'nan') return createSpecialState('nan')
  if (left._k === 'inf' && right._k === '-inf') return createSpecialState('nan')
  if (left._k === '-inf' && right._k === 'inf') return createSpecialState('nan')
  if (left._k !== 'normal') return left
  if (right._k !== 'normal') return right
  if (isZeroState(left)) return right
  if (isZeroState(right)) return left

  const aligned = alignStates(left, right)
  if (left._s === right._s) {
    return buildNormalState(left._s as -1 | 1, addDigits(aligned.leftDigits, aligned.rightDigits), aligned.exponent)
  }

  const absCompared = compareDigits(aligned.leftDigits, aligned.rightDigits)
  if (absCompared === 0) return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })

  if (absCompared > 0) {
    return buildNormalState(left._s as -1 | 1, subtractDigits(aligned.leftDigits, aligned.rightDigits), aligned.exponent)
  }
  return buildNormalState(right._s as -1 | 1, subtractDigits(aligned.rightDigits, aligned.leftDigits), aligned.exponent)
}

/**
 * 使用内部万进制状态执行减法
 */
export function subtractStates(left: ForeState, right: ForeState): ForeState {
  return addStates(left, negateState(right))
}

/**
 * 使用内部万进制状态执行乘法
 */
export function multiplyStates(left: ForeState, right: ForeState): ForeState {
  if (left._k === 'nan' || right._k === 'nan') return createSpecialState('nan')
  if ((left._k === 'inf' || left._k === '-inf') && isZeroState(right)) return createSpecialState('nan')
  if ((right._k === 'inf' || right._k === '-inf') && isZeroState(left)) return createSpecialState('nan')

  if (left._k === 'inf' || left._k === '-inf' || right._k === 'inf' || right._k === '-inf') {
    const sign = (signOfState(left) * signOfState(right)) as -1 | 1
    return createSpecialState(sign > 0 ? 'inf' : '-inf')
  }

  if (isZeroState(left) || isZeroState(right)) {
    return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })
  }

  const sign = (left._s * right._s) as -1 | 1
  return buildNormalState(sign, multiplyDigits(left._d, right._d), left._e + right._e)
}

/**
 * 使用内部万进制状态执行除法\
 * 精度按十进制小数位配置，内部使用 limb 长除法实现
 */
export function divideStates(left: ForeState, right: ForeState, context: ForeContext): ForeState {
  if (left._k === 'nan' || right._k === 'nan') return createSpecialState('nan')
  if ((left._k === 'inf' || left._k === '-inf') && (right._k === 'inf' || right._k === '-inf')) {
    return createSpecialState('nan')
  }
  if (isZeroState(left) && isZeroState(right)) return createSpecialState('nan')
  if (isZeroState(right)) {
    if (isZeroState(left)) return createSpecialState('nan')
    return createSpecialState(signOfState(left) < 0 ? '-inf' : 'inf')
  }
  if (left._k === 'inf' || left._k === '-inf') {
    const sign = (signOfState(left) * signOfState(right)) as -1 | 1
    return createSpecialState(sign > 0 ? 'inf' : '-inf')
  }
  if (right._k === 'inf' || right._k === '-inf') {
    return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })
  }
  if (isZeroState(left)) return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })

  const sign = (left._s * right._s) as -1 | 1
  const decimalPlaces = Math.max(0, Math.trunc(context.divisionPrecision))
  const guardDigits = decimalPlaces > 0 ? DIVISION_GUARD_DIGITS : 0
  const internalPlaces = decimalPlaces + guardDigits
  const exponentDeltaDigits = (left._e - right._e) * 4
  const shift = internalPlaces + exponentDeltaDigits

  let dividend = left._d
  let divisor = right._d
  if (shift >= 0) dividend = multiplyDigitsByPowerOfTen(dividend, shift)
  else divisor = multiplyDigitsByPowerOfTen(divisor, -shift)

  let { quotient, remainder } = divideDigits(dividend, divisor)
  if (shouldRoundUp(remainder, divisor, quotient, sign, context.rounding)) {
    quotient = incrementDigits(quotient)
  }

  if (guardDigits > 0) {
    const guardScale = multiplyDigitsByPowerOfTen([1], guardDigits)
    const guardReduced = divideDigits(quotient, guardScale)
    quotient = guardReduced.quotient

    if (shouldRoundUp(guardReduced.remainder, guardScale, quotient, sign, context.rounding)) {
      quotient = incrementDigits(quotient)
    }
  }

  return stateFromScaledInteger(sign, quotient, decimalPlaces)
}

/**
 * 使用内部万进制状态执行幂运算。
 * 当前仅支持整数幂，非整数幂会抛错。
 */
export function powerStates(base: ForeState, exponent: ForeState, context: ForeContext): ForeState {
  const exponentIsZero = exponent._k === 'normal' && exponent._s === 0

  if (base._k === 'nan') {
    return exponentIsZero ? oneState() : createSpecialState('nan')
  }
  if (exponent._k !== 'normal') {
    return createSpecialState('nan')
  }

  if (!isIntegerState(exponent)) {
    throw new Error('[ForeNumber] 当前仅支持整数幂，非整数幂尚未实现')
  }

  if (exponentIsZero) return oneState()

  const exponentNegative = exponent._s < 0
  const exponentAbsDigits = integerDigitsFromState({ ...exponent, _s: exponent._s < 0 ? 1 : exponent._s })

  if (base._k === 'inf' || base._k === '-inf') {
    if (exponentNegative) {
      return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })
    }
    if (base._k === 'inf') return createSpecialState('inf')
    return isOddIntegerDigits(exponentAbsDigits) ? createSpecialState('-inf') : createSpecialState('inf')
  }

  if (isZeroState(base)) {
    if (exponentNegative) return createSpecialState('inf')
    return normalizeState({ _s: 0, _e: 0, _d: [0], _k: 'normal' })
  }

  let result = oneState()
  let factor = base
  let expDigits = exponentAbsDigits

  while (!isZeroIntegerDigits(expDigits)) {
    if (isOddIntegerDigits(expDigits)) {
      result = multiplyStates(result, factor)
    }
    expDigits = divideIntegerDigitsBy2(expDigits)
    if (!isZeroIntegerDigits(expDigits)) {
      factor = multiplyStates(factor, factor)
    }
  }

  if (!exponentNegative) return result

  const reciprocalContext: ForeContext = {
    ...context,
    divisionPrecision: Math.max(0, Math.trunc(context.powerPrecision))
  }
  return divideStates(oneState(), result, reciprocalContext)
}
