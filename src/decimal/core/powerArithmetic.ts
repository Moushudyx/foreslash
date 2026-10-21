/**
 * 幂运算统一分发入口
 *
 * 职责：
 * - 接收指数并分发到整数幂 / 有理数幂 / 实数幂路径
 * - 不做具体算法实现，所有实现委托给子模块
 *
 * 校验边界：
 * - 显式分数字符串的校验由 inspectFractionExponentString (rationalPower.ts) 完成
 * - 有理数归一化由 normalizeRational (rationalPower.ts) 完成
 * - 整数指数安全范围由 powerIntegerStates (integerPower.ts) 完成
 * - 本函数仅负责分发，不重复校验
 */

import type { ForeContext, ForeState } from '../types'
import type { RationalExponent } from './power/rationalPower'
import { classifyExponent, powerRationalStates } from './power/rationalPower'
import { integerExponentStateFromNumber, isOddIntegerState, powerIntegerStates } from './power/integerPower'
import { powerRealStates } from './power/realPowerArithmetic'
import { createSpecialState, isOneState, oneState, zeroState } from './utils'

/** 比较 normal 状态绝对值与 1 的大小，假定 digits 已归一化 */
function compareAbsWithOne(state: ForeState): -1 | 0 | 1 {
  if (state._s === 0) return -1
  const integerLength = state._d.length + state._e
  if (integerLength <= 0) return -1
  if (integerLength > 1) return 1
  return state._d[0] === 1 && state._d.slice(1).every((n) => n === 0) ? 0 : 1
}

/**
 * IEEE 754 pow 的特殊值规则
 * 仅在底数或指数为 NaN / ±Infinity 时返回结果，否则返回 null 交由后续路径
 */
function powerSpecialStates(base: ForeState, exponent: ForeState, rationalHint?: RationalExponent): ForeState | null {
  if (base._k === 'normal' && exponent._k === 'normal' && !rationalHint) return null
  if (base._k === 'normal' && rationalHint) return null

  let expKind: 'nan' | 'inf' | '-inf' | 'finite' = exponent._k === 'normal' ? 'finite' : exponent._k
  let expZero = false
  let expPositive = false
  let expOdd = false
  if (rationalHint) {
    expKind = 'finite'
    expZero = rationalHint.numerator === 0
    expPositive = rationalHint.numerator > 0
    expOdd = rationalHint.denominator === 1 && Math.abs(rationalHint.numerator) % 2 === 1
  } else if (expKind === 'finite') {
    expZero = exponent._s === 0
    expPositive = exponent._s > 0
    expOdd = isOddIntegerState(exponent)
  }

  if (expZero) return oneState()
  if (isOneState(base)) return oneState()
  if (base._k === 'nan' || expKind === 'nan') return createSpecialState('nan')

  if (expKind === 'inf' || expKind === '-inf') {
    const cmp = base._k === 'normal' ? compareAbsWithOne(base) : 1
    if (cmp === 0) return oneState() // pow(-1, ±Inf) = 1
    const grows = (cmp > 0) === (expKind === 'inf')
    return grows ? createSpecialState('inf') : zeroState()
  }

  // 底数为 ±Infinity，指数为有限非零数
  if (!expPositive) return zeroState()
  if (base._k === 'inf') return createSpecialState('inf')
  return expOdd ? createSpecialState('-inf') : createSpecialState('inf')
}

/**
 * 统一幂分发入口
 */
export function powerStates(
  base: ForeState,
  exponent: ForeState,
  context: ForeContext,
  rationalHint?: RationalExponent
): ForeState {
  const special = powerSpecialStates(base, exponent, rationalHint)
  if (special) return special

  // 显式分数提示路径
  // rationalHint 已由 inspectFractionExponentString 校验并归一化，直接信任
  if (rationalHint) {
    if (rationalHint.denominator === 1) {
      return powerIntegerStates(base, integerExponentStateFromNumber(rationalHint.numerator), context)
    }
    return powerRationalStates(base, rationalHint, context)
  }

  if (exponent._k !== 'normal') return createSpecialState('nan')

  // 自动分类路径
  const classification = classifyExponent(exponent)

  if (classification.kind === 'integer') {
    return powerIntegerStates(base, exponent, context)
  }
  if (classification.kind === 'rational') {
    if (classification.value.denominator === 1) {
      return powerIntegerStates(base, integerExponentStateFromNumber(classification.value.numerator), context)
    }
    return powerRationalStates(base, classification.value, context)
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
