import {
  isWrapperObject,
  isWrapperBigInt,
  isWrapperBoolean,
  isWrapperNumber,
  isWrapperString,
  isWrapperSymbol,
} from '../../src'

describe('isWrapperObject', () => {
  it('基本功能', () => {
    // 数字
    expect(isWrapperObject(new Number(123))).toBe(true)
    expect(isWrapperObject(Object(123))).toBe(true)
    expect(isWrapperObject(123)).toBe(false)
    // 布尔
    expect(isWrapperObject(new Boolean(true))).toBe(true)
    expect(isWrapperObject(Object(true))).toBe(true)
    expect(isWrapperObject(true)).toBe(false)
    // 字符串
    expect(isWrapperObject(new String('abc'))).toBe(true)
    expect(isWrapperObject(Object('abc'))).toBe(true)
    expect(isWrapperObject('abc')).toBe(false)
    // Symbol
    expect(isWrapperObject(Object(Symbol('abc')))).toBe(true)
    expect(isWrapperObject(Symbol('abc'))).toBe(false)
    // BigInt
    expect(isWrapperObject(Object(BigInt(123)))).toBe(true)
    expect(isWrapperObject(BigInt(123))).toBe(false)
    // 其他
    expect(isWrapperObject(null)).toBe(false)
    expect(isWrapperObject({})).toBe(false)
  })
})

describe('isWrapperBigInt', () => {
  it('基本功能', () => {
    expect(isWrapperBigInt(Object(BigInt(123)))).toBe(true)
    expect(isWrapperBigInt(BigInt(123))).toBe(false)
    expect(isWrapperBigInt(123)).toBe(false)
    expect(isWrapperBigInt(Object(123))).toBe(false)
  })
})

describe('isWrapperBoolean', () => {
  it('基本功能', () => {
    expect(isWrapperBoolean(new Boolean(true))).toBe(true)
    expect(isWrapperBoolean(Object(true))).toBe(true)
    expect(isWrapperBoolean(true)).toBe(false)
    expect(isWrapperBoolean(123)).toBe(false)
    expect(isWrapperBoolean(Object(123))).toBe(false)
  })
})

describe('isWrapperNumber', () => {
  it('基本功能', () => {
    expect(isWrapperNumber(new Number(123))).toBe(true)
    expect(isWrapperNumber(Object(123))).toBe(true)
    expect(isWrapperNumber(123)).toBe(false)
    expect(isWrapperNumber(true)).toBe(false)
    expect(isWrapperNumber(Object(true))).toBe(false)
  })
})

describe('isWrapperString', () => {
  it('基本功能', () => {
    expect(isWrapperString(new String('abc'))).toBe(true)
    expect(isWrapperString(Object('abc'))).toBe(true)
    expect(isWrapperString('abc')).toBe(false)
    expect(isWrapperString(123)).toBe(false)
    expect(isWrapperString(Object(123))).toBe(false)
  })
})

describe('isWrapperSymbol', () => {
  it('基本功能', () => {
    expect(isWrapperSymbol(Object(Symbol('abc')))).toBe(true)
    expect(isWrapperSymbol(Symbol('abc'))).toBe(false)
    expect(isWrapperSymbol(123)).toBe(false)
    expect(isWrapperSymbol(Object(123))).toBe(false)
  })
})
