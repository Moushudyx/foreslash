/**
 * 整数幂核心模块
 *
 * 职责：
 * - 整数指数幂运算（快速幂算法）
 * - 整数状态的万进制 digits 提取与操作
 */

import type { ForeContext, ForeState } from '../../types'
import { divideStates, multiplyStates } from '../stateArithmetic'
import { isZeroDigits } from '../limbMath'
import { normalizeState } from '../normalize'
import {
  createSpecialState,
  integerStateFromNumber,
  isIntegerState,
  isOneState,
  isZeroState,
  oneState,
  zeroState,
} from '../utils'
import { parseIntegerDigitsToSafeNumber } from '../utils'

// ────────────────────── 整数指数构造 ──────────────────────

/**
 * 将安全范围内的有符号整数转换为指数状态
 */
export function integerExponentStateFromNumber(value: number): ForeState {
  // 传入的 value 已经确认是安全整数
  // if (!Number.isSafeInteger(value)) {
  //   throw new Error('[ForeNumber] 仅支持安全范围内的整数指数')
  // }
  if (value === 0) return zeroState()
  const absolute = integerStateFromNumber(Math.abs(value))
  return value < 0 ? { ...absolute, _s: -1 } : absolute
}

// ────────────────────── 整数 digits 工具 ──────────────────────

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

/** 判断状态是否为 -1 */
function isNegativeOneState(state: ForeState): boolean {
  return state._k === 'normal' && state._s < 0 && state._e === 0 && state._d.length === 1 && state._d[0] === 1
}

/**
 * 在不展开指数 digits 的情况下判断整数指数奇偶性
 * 内部基数是 10000(偶数), 当 _e > 0 时指数必然为偶数
 */
export function isOddIntegerState(state: ForeState): boolean {
  if (state._k !== 'normal' || state._s === 0) return false
  if (!isIntegerState(state)) return false

  if (state._e > 0) return false
  if (state._e === 0) return (state._d[state._d.length - 1] ?? 0) % 2 === 1

  const integerLength = state._d.length + state._e
  if (integerLength <= 0) return false
  return (state._d[integerLength - 1] ?? 0) % 2 === 1
}

/** 判断整数 digits 是否为零 */
function isZeroIntegerDigits(digits: number[]): boolean {
  return isZeroDigits(digits)
}

/** 判断整数 digits 是否为奇数 */
function isOddIntegerDigits(digits: number[]): boolean {
  if (isZeroDigits(digits)) return false
  return (digits[digits.length - 1] ?? 0) % 2 === 1
}

/** 将大整数 digits 除以 2 */
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

// ────────────────────── 整数幂核心 ──────────────────────

/**
 * 整数幂核心
 *
 * 使用快速幂算法（按位折半）减少乘法次数\
 * 对直接传入的 ForeState 指数做安全整数范围校验\
 * 由已验证有理数分子构造的整数指数则直接通过
 */
export function powerIntegerStates(base: ForeState, exponent: ForeState, context: ForeContext): ForeState {
  const exponentIsZero = exponent._k === 'normal' && exponent._s === 0

  if (base._k === 'nan') {
    return exponentIsZero ? oneState() : createSpecialState('nan')
  }
  if (exponent._k !== 'normal') return createSpecialState('nan')
  // if (!isIntegerState(exponent)) {
  //   throw new Error('[ForeNumber] 当前仅支持整数幂，非整数幂尚未实现')
  // }

  if (exponentIsZero) return oneState()

  // ── 快速路径：避免展开超大指数 digits ──
  // integerDigitsFromState 中 new Array(_e) 在 _e 过大时会导致 RangeError
  // 因此 base 为 1, -1, 0, ±inf 的场景在此处提前返回

  const exponentNegative = exponent._s < 0

  if (isOneState(base)) return oneState()
  if (isNegativeOneState(base)) {
    return isOddIntegerState(exponent) ? normalizeState({ _s: -1, _e: 0, _d: [1], _k: 'normal' }) : oneState()
  }

  if (base._k === 'inf' || base._k === '-inf') {
    if (exponentNegative) return zeroState()
    if (base._k === 'inf') return createSpecialState('inf')
    return isOddIntegerState(exponent) ? createSpecialState('-inf') : createSpecialState('inf')
  }

  if (isZeroState(base)) {
    if (exponentNegative) return createSpecialState('inf')
    return zeroState()
  }

  // ── 安全范围校验 ──
  // 此时所有无需展开 exponent digits 即可判定的路径均已返回，展开操作安全

  const exponentAbsDigits = integerDigitsFromState({ ...exponent, _s: exponent._s < 0 ? 1 : exponent._s })
  if (parseIntegerDigitsToSafeNumber(exponentAbsDigits) === null) {
    throw new Error('[ForeNumber] 仅支持安全整数范围内的整数指数')
  }

  // ── 按位折半的快速幂 ──

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
    divisionPrecision: Math.max(0, Math.trunc(context.powerPrecision)),
  })
}


