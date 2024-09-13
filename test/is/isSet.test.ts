import { isSet, isWeakSet } from '../../src'

describe('isSet', () => {
  test('基本功能', () => {
    expect(isSet(new Set())).toBe(true)
    expect(isSet(Set)).toBe(false)
    expect(isSet(new WeakSet())).toBe(false)
    expect(isSet(new Map())).toBe(false)
    expect(isSet(null)).toBe(false)
    expect(isSet([])).toBe(false)
    expect(isSet(undefined)).toBe(false);
    expect(isSet(123)).toBe(false);
    expect(isSet('foo')).toBe(false);
  })
})

describe('isWeakSet', () => {
  test('基本功能', () => {
    expect(isWeakSet(new WeakSet())).toBe(true)
    expect(isWeakSet(WeakSet)).toBe(false)
    expect(isWeakSet(new Set())).toBe(false)
    expect(isWeakSet(new Map())).toBe(false)
    expect(isWeakSet(null)).toBe(false)
    expect(isWeakSet(undefined)).toBe(false);
    expect(isWeakSet(123)).toBe(false);
    expect(isWeakSet('foo')).toBe(false);
    expect(isWeakSet([])).toBe(false)
  })
})
