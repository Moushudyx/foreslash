import { isObject } from '../../src'

describe('isObject', () => {
  it('基本功能', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(/123/)).toBe(true)
    expect(isObject(Object(123))).toBe(true)
    expect(isObject(Object.create(null))).toBe(true)
    expect(isObject(123)).toBe(false)
    expect(isObject(null)).toBe(false)
  })
})
