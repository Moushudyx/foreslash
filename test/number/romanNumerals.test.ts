import { romanNumerals } from '../../src'

describe('romanNumerals', () => {
  it('基本测试', () => {
    expect(romanNumerals(0)).toBe('0') // 默认的 0
    expect(romanNumerals(1)).toBe('I') // 默认的 1
    expect(romanNumerals(4)).toBe('IV')
    expect(romanNumerals(424)).toBe('CDXXIV')
    // 超过一千的部分测试
    expect(romanNumerals(1000)).toBe('M')
    expect(romanNumerals(2025)).toBe('MMXXV')
    expect(romanNumerals(4001)).toBe('I\u0305V\u0305I')
    // 严格的写法
    expect(romanNumerals(1000, { thousand: 'strict' })).toBe('I\u0305')
    expect(romanNumerals(2025, { thousand: 'strict' })).toBe('I\u0305I\u0305XXV')
    expect(romanNumerals(4001, { thousand: 'strict' })).toBe('I\u0305V\u0305I')
    // 超过百万的部分测试
    expect(romanNumerals(1000000)).toBe('M\u0305')
    expect(romanNumerals(2025000)).toBe('M\u0305M\u0305X\u0305X\u0305V\u0305')
    expect(romanNumerals(4001001)).toBe('I\u0305\u0305V\u0305\u0305I\u0305I')
    expect(romanNumerals(1000000, { thousand: 'strict' })).toBe('I\u0305\u0305')
    expect(romanNumerals(2025000, { thousand: 'strict' })).toBe('I\u0305\u0305I\u0305\u0305X\u0305X\u0305V\u0305')
    expect(romanNumerals(4001001, { thousand: 'strict' })).toBe('I\u0305\u0305V\u0305\u0305I\u0305I')
  })
  it('多种格式测试', () => {
    // 特殊逻辑
    expect(romanNumerals(0, { zero: 'ZERO' })).toBe('ZERO') // 数字 0
    expect(romanNumerals(0, { zero: 'ZERO', type: 'json' })).toBe('["ZERO"]') // 数字 0
    expect(romanNumerals(1, { one: 'Yo' })).toBe('Yo') // 彩蛋功能
    expect(romanNumerals(1, { one: 'Yo', type: 'json' })).toBe('["Yo"]') // 彩蛋功能
    // js
    expect(romanNumerals(1000000, { type: 'js' })).toBe('M\\\\u0305')
    expect(romanNumerals(2025000, { type: 'js' })).toBe('M\\\\u0305M\\\\u0305X\\\\u0305X\\\\u0305V\\\\u0305')
    expect(romanNumerals(4001001, { type: 'js' })).toBe('I\\\\u0305\\\\u0305V\\\\u0305\\\\u0305I\\\\u0305I')
    expect(romanNumerals(1000000, { type: 'js', thousand: 'strict' })).toBe('I\\\\u0305\\\\u0305')
    expect(romanNumerals(2025000, { type: 'js', thousand: 'strict' })).toBe(
      'I\\\\u0305\\\\u0305I\\\\u0305\\\\u0305X\\\\u0305X\\\\u0305V\\\\u0305'
    )
    expect(romanNumerals(4001001, { type: 'js', thousand: 'strict' })).toBe('I\\\\u0305\\\\u0305V\\\\u0305\\\\u0305I\\\\u0305I')
    // html
    expect(romanNumerals(1000000, { type: 'html' })).toBe('M&#x0305;')
    expect(romanNumerals(2025000, { type: 'html' })).toBe('M&#x0305;M&#x0305;X&#x0305;X&#x0305;V&#x0305;')
    expect(romanNumerals(4001001, { type: 'html' })).toBe('I&#x0305;&#x0305;V&#x0305;&#x0305;I&#x0305;I')
    expect(romanNumerals(1000000, { type: 'html', thousand: 'strict' })).toBe('I&#x0305;&#x0305;')
    expect(romanNumerals(2025000, { type: 'html', thousand: 'strict' })).toBe(
      'I&#x0305;&#x0305;I&#x0305;&#x0305;X&#x0305;X&#x0305;V&#x0305;'
    )
    expect(romanNumerals(4001001, { type: 'html', thousand: 'strict' })).toBe(
      'I&#x0305;&#x0305;V&#x0305;&#x0305;I&#x0305;I'
    )
    // json
    expect(romanNumerals(1000000, { type: 'json' })).toBe('["", "M"]')
    expect(romanNumerals(2025000, { type: 'json' })).toBe('["", "MMXXV"]')
    expect(romanNumerals(4001001, { type: 'json' })).toBe('["I", "I", "IV"]')
    expect(romanNumerals(1000000, { type: 'json', thousand: 'strict' })).toBe('["", "", "I"]')
    expect(romanNumerals(2025000, { type: 'json', thousand: 'strict' })).toBe('["", "XXV", "II"]')
    expect(romanNumerals(4001001, { type: 'json', thousand: 'strict' })).toBe('["I", "I", "IV"]')
  })
  it('负数应该视为正数', () => {
    expect(romanNumerals(-0)).toBe('0')
    expect(romanNumerals(-1)).toBe('I')
    expect(romanNumerals(-4)).toBe('IV')
    expect(romanNumerals(-1000)).toBe('M')
  })
  it('非法参数测试', () => {
    expect(romanNumerals(NaN)).toBe('NaN')
    expect(romanNumerals('Not a Number')).toBe('NaN')
    expect(romanNumerals(Infinity)).toBe('Infinity')
    expect(romanNumerals('-Infinity')).toBe('-Infinity')
  })
})
