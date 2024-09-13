import { isBuffer } from '../../src'

describe('isBuffer', () => {
  it('基本功能', () => {
    const buffer = Buffer.from('test')
    expect(isBuffer(buffer)).toBe(true)
    expect(isBuffer(null)).toBe(false)
    expect(isBuffer(undefined)).toBe(false)
    expect(isBuffer(new ArrayBuffer(0))).toBe(false)
  })
})
