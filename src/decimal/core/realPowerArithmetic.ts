import type { ForeContext, ForeState } from '../types'
import { multiplyStates } from './stateArithmetic'
import { expState, lnState } from './transcendentalArithmetic'

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

  const logarithm = lnState(base, context)
  const scaledExponent = multiplyStates(logarithm, exponent)
  return expState(scaledExponent, context)
}
