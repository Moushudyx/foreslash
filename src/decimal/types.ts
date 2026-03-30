export type ForeSign = -1 | 0 | 1

export type ForeKind = 'normal' | 'nan' | 'inf' | '-inf'

export type ForeRoundMode = 'round' | 'banker' | 'floor' | 'ceil'

/**
 * ForeNumber 全局计算上下文
 *
 * 由 `ForeNumber.config(...)` 读写
 *
 * TODO: 当前版本仅有部分字段已接入实际运算
 */
export interface ForeContext {
  /**
   * 通用精度（有效数字）目标值
   * 预留给后续统一修约策略，目前尚未在四则运算中直接使用
   */
  precision: number
  /**
   * 除法结果的小数位精度（十进制位数）
   * 已用于 `divideStates`
   */
  divisionPrecision: number
  /**
   * 幂运算中间结果或输出结果精度上限（有效数字）
   * 预留给 `power/pow`，当前尚未接入
   */
  powerPrecision: number
  /**
   * 默认舍入模式
   * 已用于除法舍入
   */
  rounding: ForeRoundMode
  /**
   * 指数上限（防止上溢）
   * 预留给后续指数边界检查逻辑，当前尚未接入
   */
  maxExponent: number
  /**
   * 指数下限（防止下溢）
   * 预留给后续指数边界检查逻辑，当前尚未接入
   */
  minExponent: number
}

/** 与旧版结构兼容的输入对象 */
export interface baseForeNumber {
  _s: ForeSign
  _e: number
  _d: number[]
  /**
   * 兼容旧版标记
   * - 1: 普通数
   * - NaN / Infinity / -Infinity: 特殊值
   */
  _t: 1 | number
}

export type ForeInput = number | string | bigint | baseForeNumber | ForeNumberInstance

export interface ForeNumberInstance extends baseForeNumber {
  plus(value: ForeInput): ForeNumberInstance
  add(value: ForeInput): ForeNumberInstance
  minus(value: ForeInput): ForeNumberInstance
  sub(value: ForeInput): ForeNumberInstance
  multiply(value: ForeInput): ForeNumberInstance
  mul(value: ForeInput): ForeNumberInstance
  dividedBy(value: ForeInput): ForeNumberInstance
  div(value: ForeInput): ForeNumberInstance
  modulo(value: ForeInput): ForeNumberInstance
  mod(value: ForeInput): ForeNumberInstance
  power(value: ForeInput): ForeNumberInstance
  pow(value: ForeInput): ForeNumberInstance

  equals(value: ForeInput): boolean
  equalTo(value: ForeInput): boolean
  eq(value: ForeInput): boolean
  greaterThan(value: ForeInput): boolean
  gt(value: ForeInput): boolean
  lessThan(value: ForeInput): boolean
  lt(value: ForeInput): boolean
  greaterThanOrEqual(value: ForeInput): boolean
  gte(value: ForeInput): boolean
  lessThanOrEqual(value: ForeInput): boolean
  lte(value: ForeInput): boolean

  negated(): ForeNumberInstance
  neg(): ForeNumberInstance
  absoluteValue(): ForeNumberInstance
  abs(): ForeNumberInstance
  rounded(precision?: number, roundMode?: ForeRoundMode): ForeNumberInstance
  round(precision?: number, roundMode?: ForeRoundMode): ForeNumberInstance

  readonly isNaN: boolean
  readonly isFinite: boolean
  readonly isInteger: boolean

  toString(): string
  toJSON(): string
  toNumber(): number
  toBinary(precision?: number): string
  toBin(precision?: number): string
  toOctal(precision?: number): string
  toOct(precision?: number): string
  toHexadecimal(precision?: number): string
  toHex(precision?: number): string
  toExponential(precision?: number, round?: ForeRoundMode): string
  toExp(precision?: number, round?: ForeRoundMode): string
}

export interface ForeNumberConstructor {
  readonly pi: ForeNumberInstance
  readonly e: ForeNumberInstance

  isNaN(value: ForeInput): boolean
  isFinite(value: ForeInput): boolean
  isInteger(value: ForeInput): boolean

  config(partial?: Partial<ForeContext>): ForeContext

  new (value: ForeInput): ForeNumberInstance
}

export interface ForeState {
  _s: ForeSign
  _e: number
  _d: number[]
  _k: ForeKind
}
