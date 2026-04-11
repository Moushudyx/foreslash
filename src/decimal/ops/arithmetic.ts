import type ForeNumber from '../decimal'
import type { ForeInput } from '../types'
import { legacyTagFromKind } from '../core/kind'
import { addStates, divideStates, moduloStates, multiplyStates, quantizeStateByPrecision, subtractStates } from '../core/stateArithmetic'
import { inspectFractionExponentString, nthRootState, powerStates, MAX_RATIONAL_DENOMINATOR } from '../core/powerArithmetic'

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
 * 高精度取模
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
  let rationalHint: { numerator: number; denominator: number } | undefined

  // 斜杠指数优先走显式分数校验 避免先被普通解析吞成 NaN
  if (typeof value === 'string') {
    const inspected = inspectFractionExponentString(value)
    if (inspected.kind === 'ok') {
      rationalHint = inspected.value
    } else if (inspected.kind === 'invalid-format') {
      throw new Error('[ForeNumber] 分数字符串格式无效')
    } else if (inspected.kind === 'zero-denominator') {
      throw new Error('[ForeNumber] 分数字符串的分母不能为 0')
    } else if (inspected.kind === 'unsafe-integer') {
      throw new Error('[ForeNumber] 分数字符串超出安全整数范围')
    } else if (inspected.kind === 'denominator-too-large') {
      throw new Error(`[ForeNumber] 分数字符串的分母超过当前上限 ${MAX_RATIONAL_DENOMINATOR}`)
    }
  }

  const raw = powerStates(this, toForeNumber(this, value), context, rationalHint)
  return fromState(this, quantizeStateByPrecision(raw, context))
}

/**
 * 平方根
 */
export function squareRoot(this: ForeNumber): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const context = Ctor.config()
  const raw = nthRootState(this, 2, context)
  return fromState(this, quantizeStateByPrecision(raw, context))
}

/**
 * n 次方根
 */
export function root(this: ForeNumber, degree: ForeInput): ForeNumber {
  const Ctor = this.constructor as typeof ForeNumber
  const context = Ctor.config()
  const parsedDegree = toForeNumber(this, degree)
  if (!parsedDegree.isInteger) {
    throw new Error('[ForeNumber] root 的 degree 必须是正整数')
  }
  const degreeValue = parsedDegree.toNumber()
  const raw = nthRootState(this, degreeValue, context)
  return fromState(this, quantizeStateByPrecision(raw, context))
}
