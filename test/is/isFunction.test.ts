import { isFunction } from '../../src'

describe('isFunction', () => {
  it('基本功能', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(123)).toBe(false)
    expect(isFunction('foo')).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
  })
})
