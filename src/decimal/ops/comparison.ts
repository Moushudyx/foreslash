import type ForeNumber from '../decimal'
import type { ForeInput } from '../types'
import { compare } from '../core/compare'

/**
 * 将入参统一转换为 ForeNumber，便于复用比较内核
 */
function toForeNumber(self: ForeNumber, value: ForeInput): ForeNumber {
  const Ctor = self.constructor as typeof ForeNumber
  return new Ctor(value)
}

/**
 * 判断数值是否相等
 */
export function equals(this: ForeNumber, value: ForeInput): boolean {
  const other = toForeNumber(this, value)
  if (this._k === 'nan' || other._k === 'nan') return false
  return compare(this, other) === 0
}

/**
 * 判断当前值是否大于目标值
 */
export function greaterThan(this: ForeNumber, value: ForeInput): boolean {
  return compare(this, toForeNumber(this, value)) > 0
}

/**
 * 判断当前值是否小于目标值
 */
export function lessThan(this: ForeNumber, value: ForeInput): boolean {
  return compare(this, toForeNumber(this, value)) < 0
}

/**
 * 判断当前值是否大于等于目标值
 */
export function greaterThanOrEqual(this: ForeNumber, value: ForeInput): boolean {
  return compare(this, toForeNumber(this, value)) >= 0
}

/**
 * 判断当前值是否小于等于目标值
 */
export function lessThanOrEqual(this: ForeNumber, value: ForeInput): boolean {
  return compare(this, toForeNumber(this, value)) <= 0
}
