import type { ForeContext, ForeState } from '../types'
import { multiplyStates } from './stateArithmetic'
import { expState, lnState } from './transcendentalArithmetic'
import {
  createSpecialState,
  isOneState,
  isZeroState,
  oneState,
  zeroState
} from './utils'

/**
 * 一般实数幂的前置入口
 * 当前负责统一处理特殊值 定义域 与后续 ln exp 路线的调度骨架
 */
export function powerRealStates(base: ForeState, exponent: ForeState, context: ForeContext): ForeState {
  if (base._k === 'nan' || exponent._k === 'nan') return createSpecialState('nan')
  if (exponent._k !== 'normal') return createSpecialState('nan')
  if (exponent._s === 0) return oneState()
  if (isOneState(base)) return oneState()

  if (base._k === 'inf') {
    return exponent._s > 0 ? createSpecialState('inf') : zeroState()
  }
  if (base._k === '-inf') {
    throw new Error('[ForeNumber] 负数底数暂不支持一般实数幂')
  }
  if (isZeroState(base)) {
    return exponent._s > 0 ? zeroState() : createSpecialState('inf')
  }
  if (base._s < 0) {
    throw new Error('[ForeNumber] 负数底数暂不支持一般实数幂')
  }

  // strict 模式仅禁止真正进入一般实数幂计算路径
  if (context.realPowerMode === 'strict') {
    throw new Error('[ForeNumber] strict 模式下仅支持整数幂与有理数幂')
  }

  const logarithm = lnState(base, context)
  const scaledExponent = multiplyStates(logarithm, exponent)
  return expState(scaledExponent, context)
}
