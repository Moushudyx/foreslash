import { isArrayLike } from '../../src/index'

describe('isArrayLike', () => {
  it('基本功能', () => {
    expect(isArrayLike([])).toBe(true)
    expect(isArrayLike(new Array(10))).toBe(true)
    expect(isArrayLike('awa')).toBe(true)
    expect(isArrayLike({ 0: 0, length: 1 })).toBe(true)
    expect(isArrayLike({ 0: 0, length: -1 })).toBe(false)
  })
})
