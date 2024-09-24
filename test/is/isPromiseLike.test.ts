import { isPromiseLike } from '../../src'

describe('isPromiseLike', () => {
  it('基本功能', () => {
    expect(isPromiseLike(new Promise((res) => setTimeout(res, 100)))).toBe(true)
    expect(isPromiseLike(Promise.resolve())).toBe(true)
    expect(isPromiseLike(Promise.reject().catch(() => {}))).toBe(true)
    expect(isPromiseLike({ then: () => {} })).toBe(true)
    expect(isPromiseLike(null)).toBe(false)
    expect(isPromiseLike(undefined)).toBe(false)
    expect(isPromiseLike({})).toBe(false)
  })
})
