export type ForeSign = -1 | 0 | 1

export type ForeKind = 'normal' | 'nan' | 'inf' | '-inf'

export type ForeRoundMode = 'round' | 'banker' | 'floor' | 'ceil'

export type ForeRealPowerMode = 'approx' | 'strict'

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
   * 用于四则运算结果的统一有效数字量化
   */
  precision: number
  /**
   * 除法结果的小数位精度（十进制位数）
   * 用于 `divideStates`
   */
  divisionPrecision: number
  /**
   * 幂运算中间结果或输出结果精度上限（有效数字）
   * 用于负整数幂 倒数路径 根号迭代 与有理数幂中间量化
   */
  powerPrecision: number
  /**
   * 一般实数幂模式
   * approx 表示允许走近似 ln exp 路径
   * strict 表示仅允许整数和有理数幂
   */
  realPowerMode: ForeRealPowerMode
  /**
   * 默认舍入模式
   * 用于除法舍入
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

/**
 * ForeNumber 输入类型
 */
export type ForeInput = number | string | bigint | baseForeNumber | ForeNumberInstance

/**
 * ForeNumber 实例
 */
export interface ForeNumberInstance extends baseForeNumber {
  /** 加法, 别名 `add` */
  plus(value: ForeInput): ForeNumberInstance
  /** 加法, 别名 `plus` */
  add(value: ForeInput): ForeNumberInstance
  /** 减法, 别名 `sub` */
  minus(value: ForeInput): ForeNumberInstance
  /** 减法, 别名 `minus` */
  sub(value: ForeInput): ForeNumberInstance
  /** 乘法, 别名 `mul` */
  multiply(value: ForeInput): ForeNumberInstance
  /** 乘法, 别名 `multiply` */
  mul(value: ForeInput): ForeNumberInstance
  /** 除法, 别名 `div` */
  dividedBy(value: ForeInput): ForeNumberInstance
  /** 除法, 别名 `dividedBy` */
  div(value: ForeInput): ForeNumberInstance
  /** 取模, 别名 `mod` */
  modulo(value: ForeInput): ForeNumberInstance
  /** 取模, 别名 `modulo` */
  mod(value: ForeInput): ForeNumberInstance
  /** 幂运算, 别名 `pow` */
  power(value: ForeInput): ForeNumberInstance
  /** 幂运算, 别名 `power` */
  pow(value: ForeInput): ForeNumberInstance
  /** 平方根, 别名 `sqrt` */
  squareRoot(): ForeNumberInstance
  /** 平方根, 别名 `squareRoot` */
  sqrt(): ForeNumberInstance
  /** n 次方根 */
  root(degree: ForeInput): ForeNumberInstance

  /** 相等比较, 别名 `equalTo`、`eq` */
  equals(value: ForeInput): boolean
  /** 相等比较, 别名 `equals`、`eq` */
  equalTo(value: ForeInput): boolean
  /** 相等比较, 别名 `equals`、`equalTo` */
  eq(value: ForeInput): boolean
  /** 大于比较, 别名 `gt` */
  greaterThan(value: ForeInput): boolean
  /** 大于比较, 别名 `greaterThan` */
  gt(value: ForeInput): boolean
  /** 小于比较, 别名 `lt` */
  lessThan(value: ForeInput): boolean
  /** 小于比较, 别名 `lessThan` */
  lt(value: ForeInput): boolean
  /** 大于等于比较, 别名 `gte` */
  greaterThanOrEqual(value: ForeInput): boolean
  /** 大于等于比较, 别名 `greaterThanOrEqual` */
  gte(value: ForeInput): boolean
  /** 小于等于比较, 别名 `lte` */
  lessThanOrEqual(value: ForeInput): boolean
  /** 小于等于比较, 别名 `lessThanOrEqual` */
  lte(value: ForeInput): boolean

  /** 取反, 别名 `neg` */
  negated(): ForeNumberInstance
  /** 取反, 别名 `negated` */
  neg(): ForeNumberInstance
  /** 绝对值, 别名 `abs` */
  absoluteValue(): ForeNumberInstance
  /** 绝对值, 别名 `absoluteValue` */
  abs(): ForeNumberInstance
  /** 修约, 别名 `round` */
  rounded(precision?: number, roundMode?: ForeRoundMode): ForeNumberInstance
  /** 修约, 别名 `rounded` */
  round(precision?: number, roundMode?: ForeRoundMode): ForeNumberInstance

  /** 是否为 NaN */
  readonly isNaN: boolean
  /** 是否为有限数 */
  readonly isFinite: boolean
  /** 是否为整数 */
  readonly isInteger: boolean

  /** 转换为字符串（十进制表示） */
  toString(): string
  /** 转换为 JSON 字符串（十进制表示） */
  toJSON(): string
  /** 转换为原生 number, 可能丢失精度 */
  toNumber(): number
  /** 转换为二进制字符串, 可能丢失精度, 别名 `toBin` */
  toBinary(precision?: number): string
  /** 转换为二进制字符串, 可能丢失精度, 别名 `toBinary` */
  toBin(precision?: number): string
  /** 转换为八进制字符串, 可能丢失精度, 别名 `toOct` */
  toOctal(precision?: number): string
  /** 转换为八进制字符串, 可能丢失精度, 别名 `toOctal` */
  toOct(precision?: number): string
  /** 转换为十六进制字符串, 可能丢失精度, 别名 `toHex` */
  toHexadecimal(precision?: number): string
  /** 转换为十六进制字符串, 可能丢失精度, 别名 `toHexadecimal` */
  toHex(precision?: number): string
  /** 转换为科学计数法字符串, 可能丢失精度, 别名 `toExp` */
  toExponential(precision?: number, round?: ForeRoundMode): string
  /** 转换为科学计数法字符串, 可能丢失精度, 别名 `toExponential` */
  toExp(precision?: number, round?: ForeRoundMode): string
}

export interface ForeNumberConstructor {
  /** 圆周率常量 */
  readonly pi: ForeNumberInstance
  /** 自然对数底数常量 */
  readonly e: ForeNumberInstance

  /** 判断输入是否为 NaN */
  isNaN(value: ForeInput): boolean
  /** 判断输入是否为有限值 */
  isFinite(value: ForeInput): boolean
  /** 判断输入是否为整数 */
  isInteger(value: ForeInput): boolean

  /** 读取或更新全局上下文 */
  config(partial?: Partial<ForeContext>): ForeContext

  new (value: ForeInput): ForeNumberInstance
}

/**
 * decimal 模块内部使用的规范化状态
 */
export interface ForeState {
  _s: ForeSign
  _e: number
  _d: number[]
  _k: ForeKind
}
