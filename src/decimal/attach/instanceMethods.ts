import type ForeNumber from '../decimal'
import { plus, minus, multiply, dividedBy, modulo, power, root, squareRoot } from '../ops/arithmetic'
import { equals, greaterThan, lessThan, greaterThanOrEqual, lessThanOrEqual } from '../ops/comparison'
import { negated, absoluteValue, rounded } from '../ops/unary'
import { toDecimalString, toNumberValue } from '../convert/toString'
import { toBase } from '../convert/toBase'
import { toExponentialString } from '../convert/toExponential'

interface ForeNumberPrototype {
  plus: typeof plus
  add: typeof plus
  minus: typeof minus
  sub: typeof minus
  multiply: typeof multiply
  mul: typeof multiply
  dividedBy: typeof dividedBy
  div: typeof dividedBy
  modulo: typeof modulo
  mod: typeof modulo
  power: typeof power
  pow: typeof power
  squareRoot: typeof squareRoot
  sqrt: typeof squareRoot
  root: typeof root

  equals: typeof equals
  equalTo: typeof equals
  eq: typeof equals
  greaterThan: typeof greaterThan
  gt: typeof greaterThan
  lessThan: typeof lessThan
  lt: typeof lessThan
  greaterThanOrEqual: typeof greaterThanOrEqual
  gte: typeof greaterThanOrEqual
  lessThanOrEqual: typeof lessThanOrEqual
  lte: typeof lessThanOrEqual

  negated: typeof negated
  neg: typeof negated
  absoluteValue: typeof absoluteValue
  abs: typeof absoluteValue
  rounded: typeof rounded
  round: typeof rounded

  toString: typeof toDecimalString
  toJSON: typeof toDecimalString
  toNumber: typeof toNumberValue
  toBinary: (precision?: number) => string
  toBin: (precision?: number) => string
  toOctal: (precision?: number) => string
  toOct: (precision?: number) => string
  toHexadecimal: (precision?: number) => string
  toHex: (precision?: number) => string
  toExponential: typeof toExponentialString
  toExp: typeof toExponentialString
}

interface ForeNumberClass {
  prototype: ForeNumberPrototype
}

/**
 * 将拆分的实例方法挂载到 ForeNumber.prototype
 */
export function attachForeNumberInstanceMethods(ForeNumberClass: ForeNumberClass): void {
  const proto = ForeNumberClass.prototype

  proto.plus = plus
  proto.add = plus
  proto.minus = minus
  proto.sub = minus
  proto.multiply = multiply
  proto.mul = multiply
  proto.dividedBy = dividedBy
  proto.div = dividedBy
  proto.modulo = modulo
  proto.mod = modulo
  proto.power = power
  proto.pow = power
  proto.squareRoot = squareRoot
  proto.sqrt = squareRoot
  proto.root = root

  proto.equals = equals
  proto.equalTo = equals
  proto.eq = equals
  proto.greaterThan = greaterThan
  proto.gt = greaterThan
  proto.lessThan = lessThan
  proto.lt = lessThan
  proto.greaterThanOrEqual = greaterThanOrEqual
  proto.gte = greaterThanOrEqual
  proto.lessThanOrEqual = lessThanOrEqual
  proto.lte = lessThanOrEqual

  proto.negated = negated
  proto.neg = negated
  proto.absoluteValue = absoluteValue
  proto.abs = absoluteValue
  proto.rounded = rounded
  proto.round = rounded

  proto.toString = toDecimalString
  proto.toJSON = toDecimalString
  proto.toNumber = toNumberValue

  proto.toBinary = function toBinary(this: ForeNumber, precision?: number) {
    return toBase.call(this, 2, precision)
  }
  proto.toBin = proto.toBinary

  proto.toOctal = function toOctal(this: ForeNumber, precision?: number) {
    return toBase.call(this, 8, precision)
  }
  proto.toOct = proto.toOctal

  proto.toHexadecimal = function toHexadecimal(this: ForeNumber, precision?: number) {
    return toBase.call(this, 16, precision)
  }
  proto.toHex = proto.toHexadecimal

  proto.toExponential = toExponentialString
  proto.toExp = toExponentialString
}
