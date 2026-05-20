import { decimalNotation, ForeNumber } from '../../src'

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
    // ForeNumber 或类似对象
    expect(decimalNotation(new ForeNumber(-1))).toBe('-1')
    expect(decimalNotation(new ForeNumber('1e-12'))).toBe('0.000000000001')
    // toString
    expect(decimalNotation({ toString: () => '4.56' })).toBe('4.56')
    expect(decimalNotation({ toString: () => '123456789' })).toBe('123456789')
    expect(decimalNotation({ toString: () => '001000' })).toBe('1000')
    expect(decimalNotation({ toString: () => '002000.00300' })).toBe('2000.003')
    expect(decimalNotation({ toString: () => '-01.230' })).toBe('-1.23')
    expect(decimalNotation({ toString: () => '-001.2300' })).toBe('-1.23')
    expect(decimalNotation({ toString: () => '04.560' })).toBe('4.56')
    expect(decimalNotation({ toString: () => '0004.56000' })).toBe('4.56')
    const bigNumStr = '123456789'.repeat(10) // 900 位数
    expect(decimalNotation({ toString: () => bigNumStr })).toBe(bigNumStr)
    expect(decimalNotation({ toString: () => '00000' + bigNumStr })).toBe(bigNumStr)
    expect(decimalNotation({ toString: () => '-00000' + bigNumStr })).toBe('-' + bigNumStr)
    expect(decimalNotation({ toString: () => '00000' + bigNumStr + '.0000' })).toBe(bigNumStr)
    expect(decimalNotation({ toString: () => '-00000' + bigNumStr + '.0000' })).toBe('-' + bigNumStr)
  })
  it('非法参数测试', () => {
    expect(decimalNotation(NaN)).toBe('NaN')
    expect(decimalNotation(Infinity)).toBe('Infinity')
    expect(decimalNotation(-Infinity)).toBe('-Infinity')
    expect(decimalNotation('not a number')).toBe('NaN')
    expect(decimalNotation(null as any)).toBe('NaN')
    expect(decimalNotation({} as any)).toBe('NaN')
    expect(decimalNotation([1, 2] as any)).toBe('NaN')
    expect(decimalNotation({ toString: () => 'abc' })).toBe('NaN')
  })
})
