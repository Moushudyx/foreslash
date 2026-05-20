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
import { integerExponentStateFromNumber, powerIntegerStates } from './power/integerPower'
import { powerRealStates } from './power/realPowerArithmetic'
import { createSpecialState } from './utils'

/**
 * 统一幂分发入口
 */
export function powerStates(
  base: ForeState,
  exponent: ForeState,
  context: ForeContext,
  rationalHint?: RationalExponent
): ForeState {
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
