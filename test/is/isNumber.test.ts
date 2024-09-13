import { isNumber } from '../../src'

describe('isNumber', () => {
  test('基本功能', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(-1)).toBe(true)
    expect(isNumber(1.23)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(-Infinity)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(Object(123))).toBe(false)
    expect(isNumber('1.23')).toBe(false)
    expect(isNumber(Object('1.23'))).toBe(false)
  })
})
