import { isIterable } from '../../src'

describe('isIterable', () => {
  it('基本功能', () => {
    expect(isIterable([])).toBe(true)
    expect(isIterable("123")).toBe(true)
    expect(isIterable(new Map())).toBe(true)
    expect(isIterable(new Set())).toBe(true)
    expect(isIterable({})).toBe(false)
    expect(isIterable(null)).toBe(false)
    expect(isIterable(1234)).toBe(false)
  })
})
