import { isOdd, isEven } from '../../src'

describe('isOdd/isEven', () => {
  it('isOdd', () => {
    expect(isOdd(-1121321213123122)).toBe(false)
    expect(isOdd(-2)).toBe(false)
    expect(isOdd(0)).toBe(false)
    expect(isOdd(4)).toBe(false)
    expect(isOdd(97656788765674)).toBe(false)
    expect(isOdd(-1121321213123121)).toBe(true)
    expect(isOdd(-1)).toBe(true)
    expect(isOdd(1)).toBe(true)
    expect(isOdd(3)).toBe(true)
    expect(isOdd(97656788765677)).toBe(true)
  })
  it('isEven', () => {
    expect(isEven(-1121321213123122)).toBe(true)
    expect(isEven(-2)).toBe(true)
    expect(isEven(0)).toBe(true)
    expect(isEven(4)).toBe(true)
    expect(isEven(97656788765674)).toBe(true)
    expect(isEven(-1121321213123121)).toBe(false)
    expect(isEven(-1)).toBe(false)
    expect(isEven(1)).toBe(false)
    expect(isEven(3)).toBe(false)
    expect(isEven(97656788765677)).toBe(false)
  })
})
