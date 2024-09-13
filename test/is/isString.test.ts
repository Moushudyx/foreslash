import {isString} from '../../src'

describe('isString', () => {
  it('基本功能', () => {
    expect(isString('')).toBe(true)
    expect(isString('foo')).toBe(true)
    expect(isString(undefined)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(0)).toBe(false)
    expect(isString(Object('1.23'))).toBe(false)
  })
})
