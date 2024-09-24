import { isPromise } from '../../src'

describe('isPromise', () => {
  it('基本功能', () => {
    expect(isPromise(new Promise((res) => setTimeout(res, 100)))).toBe(true)
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise(Promise.reject().catch(() => {}))).toBe(true)
    expect(isPromise({ then: () => {} })).toBe(false)
    expect(isPromise(null)).toBe(false)
    expect(isPromise(undefined)).toBe(false)
    expect(isPromise({})).toBe(false)
  })
})
