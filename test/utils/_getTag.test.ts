import {getTag} from '../../src/index'

describe('getTag', () => {
  it('基本功能', () => {
    expect(getTag(null)).toBe('Null')
    expect(getTag(undefined)).toBe('Undefined')
    expect(getTag(0)).toBe('Number')
    expect(getTag('')).toBe('String')
    expect(getTag(true)).toBe('Boolean')
    expect(getTag(new Date)).toBe('Date')
    expect(getTag(new RegExp('a'))).toBe('RegExp')
    expect(getTag(new Map())).toBe('Map')
    expect(getTag(new Set())).toBe('Set')
    expect(getTag(new WeakMap())).toBe('WeakMap')
    expect(getTag(new WeakSet())).toBe('WeakSet')
    expect(getTag(new Error())).toBe('Error')
    expect(getTag([])).toBe('Array')
  })
})
