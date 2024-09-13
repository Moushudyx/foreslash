import { isInteger } from '../../src'

describe('isInteger', () => {
  test('基本功能', () => {
    expect(isInteger(0)).toBe(true)
    expect(isInteger(123)).toBe(true)
    expect(isInteger(-456)).toBe(true)
    expect(isInteger(123.456)).toBe(false)
    expect(isInteger(Object(123))).toBe(false)
    expect(isInteger(BigInt(123))).toBe(false)
    expect(isInteger('123')).toBe(false)
    expect(isInteger(true)).toBe(false)
    expect(isInteger(Infinity)).toBe(false)
    expect(isInteger(NaN)).toBe(false)
  })
})
