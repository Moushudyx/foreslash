import { castArray } from '../../src'

describe('castArray', () => {
  it('基本功能', () => {
    expect(castArray([1, 2, 3])).toEqual([1, 2, 3])
    expect(castArray([])).toEqual([])
    expect(castArray([1])).toEqual([1])
    expect(castArray(['1'])).toEqual(['1'])
    expect(castArray(1)).toEqual([1])
    expect(castArray('1')).toEqual(['1'])
  })
})
