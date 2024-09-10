import { isArray } from '../../src/index'

describe('isArray', () => {
  it('基本功能', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray('')).toBe(false)
    expect(isArray({ 0: 0, length: 1 })).toBe(false)
  })
})
