import type { ForeContext } from '../types'

/** 内部 limb 进制 */
export const FORE_BASE = 10000
/** 每个 limb 的十进制位数 */
export const FORE_BASE_DIGITS = 4

/** 默认计算上下文 */
export const DEFAULT_CONTEXT: ForeContext = {
  /** 通用有效数字精度（预留字段，当前未直接接入四则） */
  precision: 50,
  /** 除法小数位精度（十进制位数），已接入除法实现 */
  divisionPrecision: 50,
  /** 幂运算精度上限（预留字段，等待 power/pow 接入） */
  powerPrecision: 50,
  /** 默认舍入模式（已接入除法） */
  rounding: 'round',
  /** 指数上限（预留字段，等待指数边界校验接入） */
  maxExponent: 1_000_000,
  /** 指数下限（预留字段，等待指数边界校验接入） */
  minExponent: -1_000_000
}
