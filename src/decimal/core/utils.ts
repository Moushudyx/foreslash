import type { ForeState } from '../types'
import { isZeroDigits } from './limbMath'

// ────────────────────── 状态构造 ──────────────────────

/** 构造特殊值状态 (nan / inf / -inf) */
export function createSpecialState(kind: ForeState['_k']): ForeState {
  return { _s: 0, _e: 0, _d: [0], _k: kind }
}

/** 构造数值 0 的 normal 状态 */
export function zeroState(): ForeState {
  return { _s: 0, _e: 0, _d: [0], _k: 'normal' }
}

/** 构造数值 1 的 normal 状态 */
export function oneState(): ForeState {
  return { _s: 1, _e: 0, _d: [1], _k: 'normal' }
}

/** 构造非负整数的 normal 状态（仅限安全整数范围） */
export function integerStateFromNumber(value: number): ForeState {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
    throw new Error('[ForeNumber] 仅支持安全范围内的非负整数辅助参数')
  }
  if (value === 0) return zeroState()

  const digits = String(value)
  const limbs: number[] = []
  for (let index = digits.length; index > 0; index -= 4) {
    const start = Math.max(0, index - 4)
    limbs.unshift(Number.parseInt(digits.slice(start, index), 10))
  }
  return { _s: 1, _e: 0, _d: limbs, _k: 'normal' }
}

// ────────────────────── 状态判断 ──────────────────────

/** 判断状态是否表示数值零 */
export function isZeroState(state: ForeState): boolean {
  return state._k === 'normal' && (state._s === 0 || isZeroDigits(state._d))
}

/** 判断状态是否表示数值 1 */
export function isOneState(state: ForeState): boolean {
  return state._k === 'normal' && state._s === 1 && state._e === 0 && state._d.length === 1 && state._d[0] === 1
}

/** 判断状态是否表示整数 */
export function isIntegerState(state: ForeState): boolean {
  if (state._k !== 'normal') return false
  if (state._s === 0 || state._e >= 0) return true
  const needZeroCount = -state._e
  if (needZeroCount > state._d.length) return false
  for (let i = state._d.length - needZeroCount; i < state._d.length; i += 1) {
    if (state._d[i] !== 0) return false
  }
  return true
}

// ────────────────────── 状态变换 ──────────────────────

/** 获取状态符号，包含无穷值 */
export function signOfState(state: ForeState): -1 | 0 | 1 {
  if (state._k === '-inf') return -1
  if (state._k === 'inf') return 1
  return state._s
}

/** 对状态取相反数 */
export function negateState(state: ForeState): ForeState {
  if (state._k === 'nan') return state
  if (state._k === 'inf') return createSpecialState('-inf')
  if (state._k === '-inf') return createSpecialState('inf')
  if (isZeroState(state)) return zeroState()
  return { ...state, _s: (state._s * -1) as -1 | 1 }
}

/** 取状态的绝对值 */
export function absState(state: ForeState): ForeState {
  if (state._k !== 'normal') return state
  return { ...state, _s: state._s < 0 ? 1 : state._s }
}

// ────────────────────── limb 工具 ──────────────────────

/** 获取规范化后尾数对应的十进制位数 */
export function decimalDigitLength(digits: number[]): number {
  if (!digits.length || isZeroDigits(digits)) return 1
  return digits[0].toString().length + (digits.length - 1) * 4
}

// ────────────────────── 比较 ──────────────────────

/** 精确比较两个内部状态是否完全一致 */
export function statesEqual(left: ForeState, right: ForeState): boolean {
  if (left._k !== right._k || left._s !== right._s || left._e !== right._e) return false
  if (left._d.length !== right._d.length) return false
  for (let i = 0; i < left._d.length; i += 1) {
    if (left._d[i] !== right._d[i]) return false
  }
  return true
}

/** 比较两个 normal 状态的绝对值大小 */
export function compareNormalAbs(left: ForeState, right: ForeState): -1 | 0 | 1 {
  const leftMagnitude = left._e + left._d.length
  const rightMagnitude = right._e + right._d.length
  if (leftMagnitude !== rightMagnitude) return leftMagnitude > rightMagnitude ? 1 : -1

  const exponent = Math.min(left._e, right._e)
  const leftDigits = left._d.concat(new Array(left._e - exponent).fill(0))
  const rightDigits = right._d.concat(new Array(right._e - exponent).fill(0))
  const maxLength = Math.max(leftDigits.length, rightDigits.length)

  for (let index = 0; index < maxLength; index += 1) {
    const leftDigit = leftDigits[index] ?? 0
    const rightDigit = rightDigits[index] ?? 0
    if (leftDigit === rightDigit) continue
    return leftDigit > rightDigit ? 1 : -1
  }
  return 0
}

/** 比较两个 normal 状态的大小（含符号） */
export function compareNormalStates(left: ForeState, right: ForeState): -1 | 0 | 1 {
  if (left._s !== right._s) return left._s > right._s ? 1 : -1
  if (left._s === 0) return 0
  const absCompared = compareNormalAbs(left, right)
  return left._s > 0 ? absCompared : (absCompared * -1) as -1 | 0 | 1
}
