import { not } from '../src/index'

describe('not', () => {
  it('基本功能', () => {
    expect(not(false)).toBe(true)
    expect(not(true)).toBe(false)
    expect(not(1)).toBe(false)
    expect(not(0)).toBe(true)
  })
})
