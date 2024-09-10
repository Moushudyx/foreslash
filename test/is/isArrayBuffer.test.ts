import { isArrayBuffer } from '../../src/index'

describe('isArrayBuffer', () => {
  it('基本功能', () => {
    expect(isArrayBuffer(new ArrayBuffer(0))).toBe(true)
    expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true)
    expect(isArrayBuffer([])).toBe(false)
    expect(isArrayBuffer({})).toBe(false)
    expect(isArrayBuffer(null)).toBe(false)
  })
})
