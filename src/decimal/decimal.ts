import type { ForeContext, ForeInput, ForeKind, ForeNumberInstance, ForeRoundMode } from './types'
import { DEFAULT_CONTEXT } from './core/constants'
import { parseInput } from './core/parse'
import { normalizeState } from './core/normalize'
import { legacyTagFromKind } from './core/kind'
import { attachForeNumberInstanceMethods } from './attach/instanceMethods'
import { $$pi, $$e } from './constants'

/**
 * 大数字处理方案
 *
 * 内部使用 符号位 + 万进制尾数 + 万进制指数 表示数值
 */
class ForeNumber implements ForeNumberInstance {
  /** 全局上下文配置 */
  private static _context: ForeContext = { ...DEFAULT_CONTEXT }

  /** 圆周率 */
  static get pi(): ForeNumber {
    return new ForeNumber($$pi)
  }

  /** 自然对数的底 */
  static get e(): ForeNumber {
    return new ForeNumber($$e)
  }

  /**
   * 读取或更新全局上下文
   */
  static config(partial?: Partial<ForeContext>): ForeContext {
    if (!partial) return { ...ForeNumber._context }
    ForeNumber._context = {
      ...ForeNumber._context,
      ...partial
    }
    return { ...ForeNumber._context }
  }

  /** 判断输入是否为 NaN */
  static isNaN(value: ForeInput): boolean {
    return new ForeNumber(value).isNaN
  }

  /** 判断输入是否为有限值 */
  static isFinite(value: ForeInput): boolean {
    return new ForeNumber(value).isFinite
  }

  /** 判断输入是否为整数 */
  static isInteger(value: ForeInput): boolean {
    return new ForeNumber(value).isInteger
  }

  /**
   * 符号位
   * - `-1`: 负数
   * - `0`: 零
   * - `1`: 正数
   */
  _s: -1 | 0 | 1
  /** 指数位（以 10000 为底） */
  _e: number
  /** 尾数 limb 数组（每个元素范围 0-9999） */
  _d: number[]
  /** 兼容旧版的类型标记 */
  _t: 1 | number
  /** 内部类型标记，用于区分 normal/nan/inf/-inf */
  _k: ForeKind

  /** 加法，别名 add */
  plus!: (value: ForeInput) => ForeNumber
  /** 加法，别名 plus */
  add!: (value: ForeInput) => ForeNumber
  /** 减法，别名 sub */
  minus!: (value: ForeInput) => ForeNumber
  /** 减法，别名 minus */
  sub!: (value: ForeInput) => ForeNumber
  /** 乘法，别名 mul */
  multiply!: (value: ForeInput) => ForeNumber
  /** 乘法，别名 multiply */
  mul!: (value: ForeInput) => ForeNumber
  /** 除法，别名 div */
  dividedBy!: (value: ForeInput) => ForeNumber
  /** 除法，别名 dividedBy */
  div!: (value: ForeInput) => ForeNumber
  /** 取模，别名 mod */
  modulo!: (value: ForeInput) => ForeNumber
  /** 取模，别名 modulo */
  mod!: (value: ForeInput) => ForeNumber
  /** 幂运算，别名 pow */
  power!: (value: ForeInput) => ForeNumber
  /** 幂运算，别名 power */
  pow!: (value: ForeInput) => ForeNumber
  /** 平方根，别名 sqrt */
  squareRoot!: () => ForeNumber
  /** 平方根，别名 squareRoot */
  sqrt!: () => ForeNumber
  /** n 次方根 */
  root!: (degree: ForeInput) => ForeNumber

  /** 相等比较，别名 equalTo/eq */
  equals!: (value: ForeInput) => boolean
  /** 相等比较，别名 equals/eq */
  equalTo!: (value: ForeInput) => boolean
  /** 相等比较，别名 equals/equalTo */
  eq!: (value: ForeInput) => boolean
  /** 大于比较，别名 gt */
  greaterThan!: (value: ForeInput) => boolean
  /** 大于比较，别名 greaterThan */
  gt!: (value: ForeInput) => boolean
  /** 小于比较，别名 lt */
  lessThan!: (value: ForeInput) => boolean
  /** 小于比较，别名 lessThan */
  lt!: (value: ForeInput) => boolean
  /** 大于等于比较，别名 gte */
  greaterThanOrEqual!: (value: ForeInput) => boolean
  /** 大于等于比较，别名 greaterThanOrEqual */
  gte!: (value: ForeInput) => boolean
  /** 小于等于比较，别名 lte */
  lessThanOrEqual!: (value: ForeInput) => boolean
  /** 小于等于比较，别名 lessThanOrEqual */
  lte!: (value: ForeInput) => boolean

  /** 取反，别名 neg */
  negated!: () => ForeNumber
  /** 取反，别名 negated */
  neg!: () => ForeNumber
  /** 绝对值，别名 abs */
  absoluteValue!: () => ForeNumber
  /** 绝对值，别名 absoluteValue */
  abs!: () => ForeNumber
  /** 修约，别名 round */
  rounded!: (precision?: number, roundMode?: ForeRoundMode) => ForeNumber
  /** 修约，别名 rounded */
  round!: (precision?: number, roundMode?: ForeRoundMode) => ForeNumber

  /** 转换为十进制字符串 */
  toString!: () => string
  /** 转换为 JSON 字符串 */
  toJSON!: () => string
  /** 转换为原生 number */
  toNumber!: () => number
  /** 转换为二进制 */
  toBinary!: (precision?: number) => string
  /** 转换为二进制 */
  toBin!: (precision?: number) => string
  /** 转换为八进制 */
  toOctal!: (precision?: number) => string
  /** 转换为八进制 */
  toOct!: (precision?: number) => string
  /** 转换为十六进制 */
  toHexadecimal!: (precision?: number) => string
  /** 转换为十六进制 */
  toHex!: (precision?: number) => string
  /** 转换为科学计数法 */
  toExponential!: (precision?: number, round?: ForeRoundMode) => string
  /** 转换为科学计数法 */
  toExp!: (precision?: number, round?: ForeRoundMode) => string

  /** 当前实例是否为 NaN */
  get isNaN(): boolean {
    return this._k === 'nan'
  }

  /** 当前实例是否为有限值 */
  get isFinite(): boolean {
    return this._k === 'normal'
  }

  /** 当前实例是否为整数 */
  get isInteger(): boolean {
    if (this._k !== 'normal') return false
    if (this._s === 0 || this._e >= 0) return true
    const needZeroCount = -this._e
    if (needZeroCount > this._d.length) return false
    for (let i = this._d.length - needZeroCount; i < this._d.length; i++) {
      if (this._d[i] !== 0) return false
    }
    return true
  }

  /**
   * 构造 ForeNumber
   *
   * 支持 number/string/bigint/旧版结构/ForeNumber 实例
   */
  constructor(value: ForeInput) {
    const state = normalizeState(parseInput(value))
    this._s = state._s
    this._e = state._e
    this._d = state._d
    this._k = state._k
    this._t = legacyTagFromKind(state._k)
  }
}

attachForeNumberInstanceMethods(ForeNumber)

export default ForeNumber
