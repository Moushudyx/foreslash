import { isDataView } from '../../src'

describe('isDataView', () => {
  it('基本功能', () => {
    const buffer = Buffer.from('test')
    expect(isDataView(new DataView(new ArrayBuffer(8)))).toBe(true)
    expect(isDataView(new ArrayBuffer(0))).toBe(false)
    expect(isDataView([])).toBe(false)
    expect(isDataView(null)).toBe(false)
    expect(isDataView(undefined)).toBe(false)
  })
})
