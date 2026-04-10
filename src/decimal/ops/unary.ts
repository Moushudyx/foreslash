import type ForeNumber from '../decimal'
import type { ForeRoundMode } from '../types'

/** 复制当前实例 */
function clone(self: ForeNumber): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor(self)
}

/** 从原始值创建同构实例 */
function fromValue(self: ForeNumber, value: ConstructorParameters<typeof ForeNumber>[0]): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor(value)
}

/** 从特殊 kind 构造对应值 */
function fromKind(self: ForeNumber, kind: ForeNumber['_k']): ForeNumber {
  if (kind === 'inf') return fromValue(self, { _s: 0, _e: 0, _d: [0], _t: Infinity })
  if (kind === '-inf') return fromValue(self, { _s: 0, _e: 0, _d: [0], _t: -Infinity })
  if (kind === 'nan') return fromValue(self, { _s: 0, _e: 0, _d: [0], _t: Number.NaN })
  return fromValue(self, { _s: 0, _e: 0, _d: [0], _t: 1 })
}

/**
 * 取反
 */
export function negated(this: ForeNumber): ForeNumber {
  if (this._k === 'inf') return fromKind(this, '-inf')
  if (this._k === '-inf') return fromKind(this, 'inf')
  if (this._k !== 'normal') return clone(this)
  return fromValue(this, { _s: (this._s === 0 ? 0 : (this._s * -1)) as -1 | 0 | 1, _e: this._e, _d: this._d, _t: this._t })
}

/**
 * 取绝对值
 */
export function absoluteValue(this: ForeNumber): ForeNumber {
  if (this._k === '-inf') return fromKind(this, 'inf')
  if (this._k !== 'normal') return clone(this)
  return fromValue(this, { _s: this._s < 0 ? 1 : this._s, _e: this._e, _d: this._d, _t: this._t })
}

/**
 * 修约入口
 * @status placeholder
 */
export function rounded(this: ForeNumber, _precision?: number, _roundMode?: ForeRoundMode): ForeNumber {
  return clone(this)
}
