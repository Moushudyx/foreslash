import { isMap, isWeakMap } from "../../src";

describe('isMap', () => {
  it('基本功能', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
    expect(isMap(123)).toBe(false);
    expect(isMap('foo')).toBe(false);
    expect(isMap([])).toBe(false)
  })
})

describe('isWeakMap', () => {
  it('基本功能', () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
    expect(isWeakMap(new Map())).toBe(false);
    expect(isWeakMap(null)).toBe(false);
    expect(isWeakMap(undefined)).toBe(false);
    expect(isWeakMap(123)).toBe(false);
    expect(isWeakMap('foo')).toBe(false);
    expect(isWeakMap([])).toBe(false)
  })
})
