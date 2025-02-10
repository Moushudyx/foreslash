import { isFile } from '../../src'

describe('isFile', () => {
  it('基本功能', () => {
    const file = new File([new ArrayBuffer(8)], 'fileName')
    expect(isFile(file)).toBe(true)
    expect(isFile(new ArrayBuffer(0))).toBe(false)
    expect(isFile([])).toBe(false)
    expect(isFile(null)).toBe(false)
    expect(isFile(undefined)).toBe(false)
  })
})
