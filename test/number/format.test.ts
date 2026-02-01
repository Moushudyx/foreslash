import { format } from '../../src'

describe('format', () => {
  it('基本功能', () => {
    // 默认参数设置
    expect(format(1.2)).toBe('1.20')
    expect(format(0)).toBe('0.00')
    expect(format('1000')).toBe('1,000.00')
    expect(format('1000.123')).toBe('1,000.12')
    expect(format('1009.995')).toBe('1,010.00')
    expect(format('1009.099')).toBe('1,009.10')
    expect(format('1009.0')).toBe('1,009.00')
    expect(format('23456789.998')).toBe('23,456,790.00')
    // 负数
    expect(format(-1.2)).toBe('-1.20')
    expect(format(-0)).toBe('0.00')
    expect(format('-1000')).toBe('-1,000.00')
    expect(format('-1000.123')).toBe('-1,000.12')
    expect(format('-1009.995')).toBe('-1,010.00')
    expect(format('-1009.099')).toBe('-1,009.10')
    expect(format('-1009.0')).toBe('-1,009.00')
    expect(format('-23456789.998')).toBe('-23,456,790.00')
    // 自定义参数设置
    expect(format('-1009.995', { precision: 0 })).toBe('-1,010')
    expect(format(99.5, { precision: 0 })).toBe('100')
    expect(format(-1.2, { precision: 1 })).toBe('-1.2')
    expect(format(0, { precision: 3 })).toBe('0.000')
    expect(format('-1000', { separator: '.', decimal: ',' })).toBe('-1.000,00')
    expect(format('-1000', { separator: '', decimal: ',' })).toBe('-1000,00')
    expect(format('123456789', { separate: 4 })).toBe('1,2345,6789.00')
    expect(format('123456789.1234', { separate: 4, separator: '.', decimal: ',', precision: 3 })).toBe(
      '1.2345.6789,123'
    )
    expect(format('-123456789.1234', { separate: 4, separator: '.', decimal: ',', precision: 3 })).toBe(
      '-1.2345.6789,123'
    )
  })
  it('数值修约方法测试', () => {
    expect(format('-1009.995')).toBe('-1,010.00')
    expect(format('-1009.995', { round: 'round' })).toBe('-1,010.00')
    // @ts-ignore
    expect(format('-1009.995', { round: '1312131' })).toBe('-1,010.00') // 遇到不认识的修约方法是默认使用四舍五入
    expect(format('-1009.995', { round: 'banker' })).toBe('-1,010.00')
    expect(format('-1009.985', { round: 'banker' })).toBe('-1,009.98')
    expect(format(1009.985, { round: 'banker' })).toBe('1,009.98')
    expect(format('-1009.985', { round: 'floor' })).toBe('-1,009.99')
    expect(format(1009.985, { round: 'floor' })).toBe('1,009.98')
    expect(format('-1009.985', { round: 'ceil' })).toBe('-1,009.98')
    expect(format(1009.985, { round: 'ceil' })).toBe('1,009.99')
  })
  it('非法参数测试', () => {
    expect(format(NaN)).toBe('NaN')
    expect(format('Not a Number')).toBe('NaN')
    expect(format(Infinity)).toBe('Infinity')
    expect(format('-Infinity')).toBe('-Infinity')
  })
})
