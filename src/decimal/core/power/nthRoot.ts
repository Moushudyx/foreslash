/**
 * n 次方根核心模块
 *
 * 职责：
 * - n 次方根计算（牛顿迭代法）
 * - 迭代初值估计
 */

import type { ForeContext, ForeState } from '../../types'
import { addStates, divideStates, multiplyStates, quantizeStateByPrecision } from '../stateArithmetic'
import { normalizeState } from '../normalize'
import { powerIntegerStates } from './integerPower'
import {
  absState,
  createSpecialState,
  decimalDigitLength,
  isZeroState,
  negateState,
  oneState,
  statesEqual,
  zeroState,
} from '../utils'
import { integerStateFromNumber } from '../utils'

// ────────────────────── 常量 ──────────────────────

/** 根号迭代额外保留的保护位 */
const ROOT_GUARD_DIGITS = 12

/** 牛顿迭代的最大轮数 */
const ROOT_MAX_ITERATIONS = 64

// ────────────────────── 迭代辅助 ──────────────────────

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
    _k: 'normal',
  })
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
    const approx = Math.pow(
      numberApprox * Math.pow(10, Math.max(-300, Math.min(300, exponent10 - (base._d[0].toString().length - 1)))),
      1 / degree
    )
    if (Number.isFinite(approx) && approx > 0) {
      const magnitude = Math.floor(exponent10 / degree)
      return multiplyStates(
        normalizeState({ _s: 1, _e: 0, _d: [Math.max(1, Math.floor(approx))], _k: 'normal' }),
        powerOfTenState(magnitude)
      )
    }
  }

  // 回退到只按数量级估算的保守初值
  const magnitude10 = base._e * 4 + decimalDigitLength(base._d) - 1
  return powerOfTenState(Math.floor(magnitude10 / degree))
}

/**
 * 用较高内部精度执行小整数除法
 */
function divideBySmallInteger(state: ForeState, divisor: number, context: ForeContext): ForeState {
  return divideStates(state, integerStateFromNumber(divisor), {
    ...context,
    divisionPrecision: Math.max(context.divisionPrecision, context.powerPrecision + ROOT_GUARD_DIGITS),
  })
}

// ────────────────────── n 次方根核心 ──────────────────────

/**
 * n 次方根核心
 *
 * 使用牛顿迭代法计算：x_(k+1) = ((n - 1) * x_k + a / x_k^(n - 1)) / n
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
    divisionPrecision: Math.max(context.divisionPrecision, context.powerPrecision + ROOT_GUARD_DIGITS),
  }
  const stableContext: ForeContext = {
    ...internalContext,
    precision: Math.max(1, Math.trunc(context.powerPrecision)),
  }

  // 初始值过差会拖慢收敛，先做一次数量级估计
  let current = approximateInitialRoot(positiveBase, degree)
  if (isZeroState(current)) current = oneState()

  // 牛顿迭代公式
  // x_(k+1) = ((n - 1) * x_k + a / x_k^(n - 1)) / n
  for (let iteration = 0; iteration < ROOT_MAX_ITERATIONS; iteration += 1) {
    const currentPow = powerIntegerStates(current, integerStateFromNumber(degree - 1), internalContext)
    const division = divideStates(positiveBase, currentPow, internalContext)
    const scaledCurrent = multiplyStates(current, integerStateFromNumber(degree - 1))
    const next = divideBySmallInteger(addStates(scaledCurrent, division, internalContext), degree, internalContext)

    // 用稳定精度判断是否已经收敛，避免被保护位抖动影响
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
