import type { ForeContext } from '../types'

/** 内部 limb 进制 */
export const FORE_BASE = 10000
/** 每个 limb 的十进制位数 */
export const FORE_BASE_DIGITS = 4

/** 默认计算上下文 */
export const DEFAULT_CONTEXT: ForeContext = {
  /** 通用有效数字精度（已接入四则运算结果统一量化） */
  precision: 50,
  /** 除法小数位精度（十进制位数），已接入除法实现 */
  divisionPrecision: 50,
  /** 幂运算精度上限，已接入负整数幂 根号与有理数幂 */
  powerPrecision: 50,
  /** 一般实数幂模式，默认走近似 ln exp 路径 */
  realPowerMode: 'approx',
  /** 默认舍入模式（已接入除法） */
  rounding: 'round',
  /** 指数上限（预留字段，等待指数边界校验接入） */
  maxExponent: 1_000_000,
  /** 指数下限（预留字段，等待指数边界校验接入） */
  minExponent: -1_000_000
}
