/** 与 ForeNumber 的核心部分兼容 */
export interface baseForeNumber {
  /** 符号位 */
  _s: -1 | 0 | 1
  /** 指数位 */
  _e: number
  /** 尾数位, 数字数组 */
  _d: number[]
  /** 类型标识, 可能是 `1` `NaN` `Infinity` `-Infinity` */
  _t: 1 | number
}

/** 大数字处理方案具体接口实现 */
export abstract class ForeNumber {
  /** 圆周率 */
  static pi: ForeNumber
  /** 自然对数的底 */
  static e: ForeNumber

  /** 是否为无效数字 `NaN`, 此外实例上存在 `isNaN` 属性可以直接得知某个 ForeNumber 是否有效(`ForeNumber.prototype.isNaN`) */
  static isNaN(value: number | string | ForeNumber): boolean
  /** 是否为有限数, 此外实例上存在 `isFinite` 属性可以直接得知某个 ForeNumber 是否为有限数(`ForeNumber.prototype.isFinite`) */
  static isFinite(value: number | string | ForeNumber): boolean
  /** 是否为整数, 此外实例上存在 `isInteger` 属性可以直接得知某个 ForeNumber 是否为整数(`ForeNumber.prototype.isInteger`) */
  static isInteger(value: number | string | ForeNumber): boolean

  // 具体构造

  /** 构造函数 */
  constructor(value: number | string | baseForeNumber)
  /** 符号位 */
  _s: -1 | 0 | 1
  /** 指数位 */
  _e: number
  /** 尾数位, 数字数组 */
  _d: number[]
  /** 类型标识, 可能是 `1` `NaN` `Infinity` `-Infinity` */
  _t: 1 | number

  // 运算操作

  /** 加法, 别名 `add` */
  plus(value: number | string | ForeNumber): ForeNumber
  /** 加法, 别名 `plus` */
  add(value: number | string | ForeNumber): ForeNumber
  /** 减法, 别名 `sub` */
  minus(value: number | string | ForeNumber): ForeNumber
  /** 减法, 别名 `minus` */
  sub(value: number | string | ForeNumber): ForeNumber
  /** 乘法, 别名 `mul` */
  multiply(value: number | string | ForeNumber): ForeNumber
  /** 乘法, 别名 `multiply` */
  mul(value: number | string | ForeNumber): ForeNumber
  /** 除法, 别名 `div` */
  dividedBy(value: number | string | ForeNumber): ForeNumber
  /** 除法, 别名 `dividedBy` */
  div(value: number | string | ForeNumber): ForeNumber
  /** 取模, 别名 `mod` */
  modulo(value: number | string | ForeNumber): ForeNumber
  /** 取模, 别名 `modulo` */
  mod(value: number | string | ForeNumber): ForeNumber
  /** 幂运算, 别名 `pow` */
  power(value: number | string | ForeNumber): ForeNumber
  /** 幂运算, 别名 `power` */
  pow(value: number | string | ForeNumber): ForeNumber

  // 其他操作

  /** 比较大小, 别名 `equalTo` `eq` */
  equals(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `equals` `eq` */
  equalTo(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `equals` `equalTo` */
  eq(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `gt` */
  greaterThan(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `greaterThan` */
  gt(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `lt` */
  lessThan(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `lessThan` */
  lt(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `gte` */
  greaterThanOrEqual(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `greaterThanOrEqual` */
  gte(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `lte` */
  lessThanOrEqual(value: number | string | ForeNumber): boolean
  /** 比较大小, 别名 `lessThanOrEqual` */
  lte(value: number | string | ForeNumber): boolean
  /** 取反, 别名 `neg` */
  negated(): ForeNumber
  /** 取反, 别名 `negated` */
  neg(): ForeNumber
  /** 取绝对值, 别名 `abs` */
  absoluteValue(): ForeNumber
  /** 取绝对值, 别名 `absoluteValue` */
  abs(): ForeNumber
  /** 数值修约, 默认使用四舍五入, 别名 `round` */
  rounded(precision?: number, roundMode?: 'round' | 'banker' | 'floor' | 'ceil'): ForeNumber
  /** 数值修约, 默认使用四舍五入, 别名 `rounded` */
  round(precision?: number, roundMode?: 'round' | 'banker' | 'floor' | 'ceil'): ForeNumber
  /** 是否为无效数字 `NaN`, 想检测某个 数字/字符串/ForeNumber 是否为无效数字请使用静态方法 `ForeNumber.isNaN(...)` */
  get isNaN(): boolean
  /** 是否为有限数, 想检测某个 数字/字符串/ForeNumber 是否为有限数请使用静态方法 `ForeNumber.isFinite(...)` */
  get isFinite(): boolean
  /** 是否为整数, 想检测某个 数字/字符串/ForeNumber 是否为整数请使用静态方法 `ForeNumber.isInteger(...)` */
  get isInteger(): boolean

  // 输出

  /**
   * 转换为字符串, 默认使用十进制表示\
   * 如果想要转换为科学计数法, 请使用 `scientificNotation(ForeNumber)`\
   * 如果想要转换为逗号分隔等格式, 请使用 `format(ForeNumber)`\
   */
  toString(): string
  /** 转换为可以用于 JSON 序列化的字符串, 如果需要数字请使用 `toNumber()`\
   * 超出安全范围时返回 `Infinity`(正数过大) 或 `-Infinity`(负数绝对值过大) 或 `0`(绝对值过小) */
  toJSON(): string
  /** 转换为数字, 由于 JS 的数字是双精度浮点数, 可能出现精度丢失的情况\
   * 如果超出安全范围时返回 `Infinity`(正数过大) 或 `-Infinity`(负数绝对值过大) 或 `0`(绝对值过小) */
  toNumber(): number
  /** 转换为二进制, 别名 `toBin` */
  toBinary(): string
  /** 转换为二进制, 别名 `toBinary` */
  toBin(): string
  /** 转换为八进制, 别名 `toOct` */
  toOctal(): string
  /** 转换为八进制, 别名 `toOct` */
  toOct(): string
  /** 转换为十六进制, 别名 `toHex` */
  toHexadecimal(): string
  /** 转换为十六进制, 别名 `toHexadecimal` */
  toHex(): string
  /** 类似使用 `scientificNotation(ForeNumber)` 但是只输出指数表示法\
   * 如果想要转换为其他格式的科学计数法, 请使用 `scientificNotation(ForeNumber)`\
   * 别名 `toExp` */
  toExponential(precision?: number, round?: 'round' | 'banker' | 'floor' | 'ceil'): string
  /** 类似使用 `scientificNotation(ForeNumber)` 但是只输出指数表示法\
   * 如果想要转换为其他格式的科学计数法, 请使用 `scientificNotation(ForeNumber)`\
   * 别名 `toExponential` */
  toExp(precision?: number, round?: 'round' | 'banker' | 'floor' | 'ceil'): string
}
