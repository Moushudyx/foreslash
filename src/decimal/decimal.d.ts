import type { ForeContext, ForeInput, ForeNumberConstructor, ForeNumberInstance, ForeRoundMode, baseForeNumber } from './types'

export type { ForeContext, ForeInput, ForeNumberConstructor, ForeNumberInstance, ForeRoundMode, baseForeNumber }

declare class ForeNumber implements ForeNumberInstance {
  static readonly pi: ForeNumber
  static readonly e: ForeNumber
  static config(partial?: Partial<ForeContext>): ForeContext
  static isNaN(value: ForeInput): boolean
  static isFinite(value: ForeInput): boolean
  static isInteger(value: ForeInput): boolean

  _s: -1 | 0 | 1
  _e: number
  _d: number[]
  _t: 1 | number

  constructor(value: ForeInput)

  plus(value: ForeInput): ForeNumber
  add(value: ForeInput): ForeNumber
  minus(value: ForeInput): ForeNumber
  sub(value: ForeInput): ForeNumber
  multiply(value: ForeInput): ForeNumber
  mul(value: ForeInput): ForeNumber
  dividedBy(value: ForeInput): ForeNumber
  div(value: ForeInput): ForeNumber
  modulo(value: ForeInput): ForeNumber
  mod(value: ForeInput): ForeNumber
  power(value: ForeInput): ForeNumber
  pow(value: ForeInput): ForeNumber
  squareRoot(): ForeNumber
  sqrt(): ForeNumber
  root(degree: ForeInput): ForeNumber

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

  negated(): ForeNumber
  neg(): ForeNumber
  absoluteValue(): ForeNumber
  abs(): ForeNumber
  rounded(precision?: number, roundMode?: ForeRoundMode): ForeNumber
  round(precision?: number, roundMode?: ForeRoundMode): ForeNumber

  get isNaN(): boolean
  get isFinite(): boolean
  get isInteger(): boolean

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

export default ForeNumber
