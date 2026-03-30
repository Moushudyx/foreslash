import { FORE_BASE } from './constants'
import type { ForeState } from '../types'

/**
 * 统一内部状态，确保每次构造和运算后都满足不变式
 */
export function normalizeState(state: ForeState): ForeState {
  if (state._k !== 'normal') {
    return { _s: 0, _e: 0, _d: [0], _k: state._k }
  }

  let s = state._s
  let e = Number.isFinite(state._e) ? Math.trunc(state._e) : 0
  const d = Array.from(state._d)
    .map((n) => (Number.isFinite(n) ? Math.trunc(Math.abs(n)) : 0))
    .map((n) => n % FORE_BASE)

  while (d.length > 1 && d[0] === 0) d.shift()
  while (d.length > 1 && d[d.length - 1] === 0) {
    d.pop()
    e += 1
  }

  if (!d.length || d.every((n) => n === 0)) {
    return { _s: 0, _e: 0, _d: [0], _k: 'normal' }
  }
  if (s === 0) s = 1

  return { _s: s, _e: e, _d: d, _k: 'normal' }
}
