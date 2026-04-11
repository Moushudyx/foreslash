import type ForeNumber from '../decimal'
import type { ForeInput } from '../types'
import { legacyTagFromKind } from '../core/kind'
import { addStates, divideStates, moduloStates, multiplyStates, powerStates, quantizeStateByPrecision, subtractStates } from '../core/stateArithmetic'

/** 将任意入参标准化为 ForeNumber 实例 */
function toForeNumber(self: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor(value)
}

/** 将内部 state 还原为 ForeNumber 实例 */
function fromState(self: ForeNumber, state: ReturnType<typeof addStates>): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor({
    _s: state._s,
    _e: state._e,
    _d: state._d,
    _t: legacyTagFromKind(state._k)
  })
}

/**
 * 高精度加法
 */
export function plus(this: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const raw = addStates(this, toForeNumber(this, value))
  return fromState(this, quantizeStateByPrecision(raw, Ctor.config()))
}

/**
 * 高精度减法
 */
export function minus(this: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const raw = subtractStates(this, toForeNumber(this, value))
  return fromState(this, quantizeStateByPrecision(raw, Ctor.config()))
}

/**
 * 高精度乘法
 */
export function multiply(this: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const raw = multiplyStates(this, toForeNumber(this, value))
  return fromState(this, quantizeStateByPrecision(raw, Ctor.config()))
}

/**
 * 高精度除法
 */
export function dividedBy(this: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const context = Ctor.config()
  const raw = divideStates(this, toForeNumber(this, value), context)
  return fromState(this, quantizeStateByPrecision(raw, context))
}

/**
 * 高精度取模\
 * 当前实现：截断除法余数（与 JS `%` 一致）
 */
export function modulo(this: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const raw = moduloStates(this, toForeNumber(this, value))
  return fromState(this, quantizeStateByPrecision(raw, Ctor.config()))
}

/**
 * 高精度幂运算
 */
export function power(this: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const context = Ctor.config()
  const raw = powerStates(this, toForeNumber(this, value), context)
  return fromState(this, quantizeStateByPrecision(raw, context))
}
