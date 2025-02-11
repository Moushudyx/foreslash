import { isFormData } from '../../src'

describe('isFormData', () => {
  it('基本功能', () => {
    expect(isFormData(new FormData())).toBe(true)
    expect(isFormData(new ArrayBuffer(0))).toBe(false)
    expect(isFormData([])).toBe(false)
    expect(isFormData(null)).toBe(false)
    expect(isFormData(undefined)).toBe(false)
  })
})
