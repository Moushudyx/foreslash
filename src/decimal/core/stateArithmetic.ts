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
import {
  createSpecialState,
  decimalDigitLength,
  isZeroState,
  negateState,
  signOfState
} from './utils'
import { parseDecimalString } from './parse'

/** 除法保护位数, 用于防止除法结果精度丢失 */
const DIVISION_GUARD_DIGITS = 16

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
 * 使用内部万进制状态执行取模
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
export function addStates(left: ForeState, right: ForeState, context: ForeContext): ForeState {
  if (left._k === 'nan' || right._k === 'nan') return createSpecialState('nan')
  if (left._k === 'inf' && right._k === '-inf') return createSpecialState('nan')
  if (left._k === '-inf' && right._k === 'inf') return createSpecialState('nan')
  if (left._k !== 'normal') return left
  if (right._k !== 'normal') return right
  if (isZeroState(left)) return right
  if (isZeroState(right)) return left

  // 量级差过大时，较小的数无法影响结果，直接丢弃（避免大跨度指数对齐 OOM）
  const precision = Math.trunc(context.precision)
  if (Number.isFinite(precision) && precision > 0) {
    const leftMag = left._e + left._d.length
    const rightMag = right._e + right._d.length
    const magDiff = Math.abs(leftMag - rightMag)
    const precisionLimbs = Math.ceil(precision / 4) + 2
    if (magDiff > precisionLimbs) {
      return leftMag > rightMag ? left : right
    }
  }

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
export function subtractStates(left: ForeState, right: ForeState, context: ForeContext): ForeState {
  return addStates(left, negateState(right), context)
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
 * 使用内部万进制状态执行除法
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

  // 极端指数差：切到系数分离路径，避免创建巨量 padding 数组 OOM
  const MAX_SCALE_SHIFT = 1_000_000
  if (Math.abs(shift) > MAX_SCALE_SHIFT) {
    return divideStatesExtremeShift(left, right, sign, decimalPlaces, guardDigits, internalPlaces, context)
  }

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
 * 极端指数差下的除法：系数分离 + 指数补偿，避免大数组 OOM
 * 采用先计算系数商再作为十进制字符串结合指数解析的方式，确保修约精度
 */
function divideStatesExtremeShift(
  left: ForeState,
  right: ForeState,
  sign: -1 | 1,
  decimalPlaces: number,
  guardDigits: number,
  internalPlaces: number,
  context: ForeContext
): ForeState {
  // 仅缩放系数部分（小数组），不混合指数差
  let dividend = multiplyDigitsByPowerOfTen(left._d, internalPlaces)
  const divisor = right._d

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

  // 系数商转换为十进制字符串，再追加上指数差，整体重解析
  const coeffStr = limbsToDecimalString(quotient)
  const totalExp10 = (left._e - right._e) * 4 - decimalPlaces
  const resultStr = `${sign < 0 ? '-' : ''}${coeffStr}e${totalExp10 >= 0 ? '+' : ''}${totalExp10}`
  return parseDecimalString(resultStr)
}

/** 将 limb 数组转换为无符号十进制整数字符串 */
function limbsToDecimalString(digits: number[]): string {
  if (isZeroDigits(digits)) return '0'
  let str = digits[0].toString()
  for (let i = 1; i < digits.length; i += 1) {
    str += digits[i].toString().padStart(4, '0')
  }
  return str
}
