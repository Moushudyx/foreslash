import type ForeNumber from '../decimal'
import type { ForeInput } from '../types'
import { legacyTagFromKind } from '../core/kind'
import { addStates, divideStates, moduloStates, multiplyStates, subtractStates } from '../core/stateArithmetic'

/** 抛出统一的占位实现错误。 */
function notImplemented(name: string): never {
  throw new Error(`[ForeNumber] ${name} 尚未实现；当前阶段先完成类型与框架重构`)
}

/** 将任意入参标准化为 ForeNumber 实例。 */
function toForeNumber(self: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor(value)
}

/** 将内部 state 还原为 ForeNumber 实例。 */
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
 * 高精度加法。
 */
export function plus(this: ForeNumber, value: ForeInput): ForeNumber {
  return fromState(this, addStates(this, toForeNumber(this, value)))
}

/**
 * 高精度减法。
 */
export function minus(this: ForeNumber, value: ForeInput): ForeNumber {
  return fromState(this, subtractStates(this, toForeNumber(this, value)))
}

/**
 * 高精度乘法。
 */
export function multiply(this: ForeNumber, value: ForeInput): ForeNumber {
  return fromState(this, multiplyStates(this, toForeNumber(this, value)))
}

/**
 * 高精度除法。
 */
export function dividedBy(this: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  return fromState(this, divideStates(this, toForeNumber(this, value), Ctor.config()))
}

/**
 * 高精度取模。
 * 当前实现语义：截断除法余数（与 JS `%` 一致）。
 */
export function modulo(this: ForeNumber, value: ForeInput): ForeNumber {
  return fromState(this, moduloStates(this, toForeNumber(this, value)))
}

/**
 * 高精度幂运算。
 * @status placeholder
 */
export function power(this: ForeNumber, _value: ForeInput): ForeNumber {
  return notImplemented('power/pow')
}
