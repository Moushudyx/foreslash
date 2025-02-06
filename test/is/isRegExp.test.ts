import { isRegExp } from '../../src'

describe('isRegExp', () => {
  it('基本功能', () => {
    expect(isRegExp(new RegExp("123"))).toBe(true)
    expect(isRegExp(/123/)).toBe(true)
    expect(isRegExp("123")).toBe(false)
    expect(isRegExp({})).toBe(false)
    expect(isRegExp(null)).toBe(false)
  })
})
