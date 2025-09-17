import { decimalNotation } from '../../src'

describe('decimalNotation', () => {
  it('基本功能', () => {
    // 基本展示
    expect(decimalNotation(5)).toBe('5')
    expect(decimalNotation('5')).toBe('5')
    expect(decimalNotation(5.123)).toBe('5.123')
    expect(decimalNotation('5.123')).toBe('5.123')
    // 科学计数法转换为十进制
    expect(decimalNotation(1e-12)).toBe('0.000000000001')
    expect(decimalNotation('1e-12')).toBe('0.000000000001')
    expect(decimalNotation(12.3e21)).toBe('12300000000000000000000')
    expect(decimalNotation('12.3e21')).toBe('12300000000000000000000')
    // 负数测试
    expect(decimalNotation(-1)).toBe('-1')
    expect(decimalNotation('-2')).toBe('-2')
    expect(decimalNotation(-12.34)).toBe('-12.34')
    expect(decimalNotation('-12.34')).toBe('-12.34')
    expect(decimalNotation(-1123e-12)).toBe('-0.000000001123')
    expect(decimalNotation('-1123e-12')).toBe('-0.000000001123')
    expect(decimalNotation(-3.21e21)).toBe('-3210000000000000000000')
    expect(decimalNotation('-3.21e21')).toBe('-3210000000000000000000')
  })
  it('非法参数测试', () => {
    expect(decimalNotation(NaN)).toBe('NaN')
    expect(decimalNotation(Infinity)).toBe('Infinity')
    expect(decimalNotation('not a number')).toBe('NaN')
  })
})
