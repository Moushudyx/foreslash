import { scientificNotation } from '../../src'

describe('scientificNotation', () => {
  it('基本测试', () => {
    // 四舍五入
    expect(scientificNotation(1e12)).toEqual('1×10¹²')
    expect(scientificNotation(1e12, { precision: 2 })).toEqual('1.00×10¹²')
    expect(scientificNotation(1.1, { precision: 2 })).toEqual('1.10×10⁰')
    expect(scientificNotation(3)).toEqual('3×10⁰')
    expect(scientificNotation(3.2357, { precision: 3 })).toEqual('3.236×10⁰')
    expect(scientificNotation(-2.33e-8)).toEqual('-2.33×10⁻⁸')
    expect(scientificNotation(-2.33e-8, { precision: 1 })).toEqual('-2.3×10⁻⁸')
    // 多种输出测试
    expect(scientificNotation(1.234e-6, { type: 'exp' })).toEqual('1.234e-6')
    expect(scientificNotation(1.234e6, { type: 'exp' })).toEqual('1.234e+6')
    expect(scientificNotation(6.534e-6, { type: 'js' })).toEqual('6.534*10**-6')
    expect(scientificNotation(6.534e6, { type: 'js' })).toEqual('6.534*10**6')
    expect(scientificNotation(6.534e-6, { type: 'code' })).toEqual('6.534*10^-6')
    expect(scientificNotation(6.534e6, { type: 'code' })).toEqual('6.534*10^6')
    expect(scientificNotation(-4.321e-8, { type: 'html' })).toEqual('-4.321&#x00d7;10<sup>-8</sup>')
    expect(scientificNotation(-4.321e8, { type: 'html' })).toEqual('-4.321&#x00d7;10<sup>8</sup>')
    expect(scientificNotation(-9.87e-9, { type: 'json' })).toEqual('{"number":"-9.87","exp":-9}')
    expect(scientificNotation(-9.87e9, { type: 'json' })).toEqual('{"number":"-9.87","exp":9}')
  })
  it('复合输出测试', () => {
    expect(scientificNotation(1.235e6, { type: 'exp', precision: 2 })).toEqual('1.24e+6')
    expect(scientificNotation(6.545e-6, { type: 'code', precision: 2, round: 'banker' })).toEqual('6.54*10^-6')
    expect(scientificNotation(-9.87e9, { type: 'json', precision: 1, round: 'floor' })).toEqual(
      '{"number":"-9.9","exp":9}'
    )
  })
  it('非法参数测试', () => {
    expect(scientificNotation(NaN)).toBe('NaN')
    expect(scientificNotation(Infinity)).toBe('Infinity')
    expect(scientificNotation('not a number')).toBe('NaN')
  })
})
