import { isSymbol } from '../../src'

describe('isSymbol', () => {
  it('基本功能', () => {
    expect(isSymbol(Symbol('test'))).toBe(true)
    expect(isSymbol(123)).toBe(false)
    expect(isSymbol('test')).toBe(false)
    expect(isSymbol(null)).toBe(false)
    expect(isSymbol(undefined)).toBe(false)
    expect(isSymbol(Object(Symbol()))).toBe(false)
  })
})
