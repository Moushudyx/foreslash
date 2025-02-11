import { isDate } from '../../src'

describe('isPromise', () => {
  it('基本功能', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date(123456789))).toBe(true)
    expect(isDate(Date.now())).toBe(false)
    expect(isDate(Date)).toBe(false)
    expect(isDate({})).toBe(false)
  })
})
