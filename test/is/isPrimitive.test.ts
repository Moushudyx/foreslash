import { isPrimitive } from '../../src'

describe('isPrimitive', () => {
  it('基本功能', () => {
    expect(isPrimitive(123)).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive('123')).toBe(true)
    expect(isPrimitive(BigInt(1))).toBe(true)
    expect(isPrimitive(Symbol())).toBe(true)
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(void 0)).toBe(true)
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(/123/)).toBe(false)
    expect(isPrimitive(Object(123))).toBe(false)
    expect(isPrimitive(function () {})).toBe(false)
    expect(isPrimitive(() => 1)).toBe(false)
  })
})
