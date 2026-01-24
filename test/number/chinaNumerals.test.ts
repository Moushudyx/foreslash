import { chinaNumerals } from '../../src'

describe('chinaNumerals', () => {
  it('基本功能', () => {
    expect(chinaNumerals(0)).toBe('零')
    expect(chinaNumerals(2025)).toBe('二千零二十五')
    expect(chinaNumerals(2025, { type: 'upper' })).toBe('贰仟零贰拾伍')
    expect(chinaNumerals(1002003, { type: 'lower' })).toBe('一百万二千〇三')
    expect(chinaNumerals(1002003.45, { type: 'normal' })).toBe('一百万二千零三点四五')
    expect(chinaNumerals(3006007.89, { type: 'normal' })).toBe('三百万六千零七点八九')
    expect(chinaNumerals(3056007.89, { type: 'normal' })).toBe('三百零五万六千零七点八九')
    expect(chinaNumerals(3506007.89, { type: 'normal' })).toBe('三百五十万六千零七点八九')
    expect(chinaNumerals(3500000.89, { type: 'upper' })).toBe('叁佰伍拾万点捌玖')
    expect(chinaNumerals(1234_5678_9012_3456)).toBe('一千二百三十四兆五千六百七十八亿九千零一十二万三千四百五十六')
    expect(chinaNumerals(1234_0000_0912_3456)).toBe('一千二百三十四兆零九百一十二万三千四百五十六')
    expect(chinaNumerals(1234_0000_9012_3456)).toBe('一千二百三十四兆九千零一十二万三千四百五十六')
    expect(chinaNumerals(1234_0000_0000_3456)).toBe('一千二百三十四兆三千四百五十六')
    expect(chinaNumerals(1234_0000_0000_0000)).toBe('一千二百三十四兆')
    expect(chinaNumerals(1234_5678_9012_3456, { type: 'upper' })).toBe(
      '壹仟贰佰叁拾肆兆伍仟陆佰柒拾捌亿玖仟零壹拾贰万叁仟肆佰伍拾陆'
    )
  })
  it('自定义字符', () => {
    expect(
      chinaNumerals(2025, { type: 'custom', customNumerals: '0123456789', customUnits: '拾百千万亿兆京垓秭穰沟涧正载' })
    ).toBe('2千02拾5')
    expect(
      chinaNumerals(2025e16, { type: 'custom', customNumerals: '0123456789', customUnits: '拾百千万亿' })
    ).toBe('2千02拾5亿亿')
  })
  it('自定义小数点和小数单位', () => {
    expect(
      chinaNumerals(12345.678, { integerUnit: '元', dot: '', fractionalUnits: ['角', '分', '厘'] })
    ).toBe('一万二千三百四十五元六角七分八厘')
    expect(
      chinaNumerals(1002.3, { integerUnit: '块', dot: '又', fractionalUnits: ['毛'] })
    ).toBe('一千零二块又三毛')
    expect(
      chinaNumerals(10023, { integerUnit: '块', dot: '又', fractionalUnits: ['毛'] })
    ).toBe('一万零二十三块')
  })
  it('下数表示法', () => {
    expect(chinaNumerals(0, { numeralsType: 'minio' })).toBe('零')
    expect(chinaNumerals(123456789.89, { numeralsType: 'minio' })).toBe('一垓二京三兆四亿五万六千七百八十九点八九')
    expect(chinaNumerals(123456789.89, { type: 'upper', numeralsType: 'minio' })).toBe(
      '壹垓贰京叁兆肆亿伍万陆仟柒佰捌拾玖点捌玖'
    )
    expect(chinaNumerals(1110000000000000, { numeralsType: 'minio' })).toBe('一十一载一正')
    expect(chinaNumerals(1110000000000007.1, { type: 'upper', numeralsType: 'minio' })).toBe('壹拾壹载壹正零柒点壹')
  })
  it('上数表示法', () => {
    expect(chinaNumerals(0, { numeralsType: 'mega' })).toBe('零')
    expect(chinaNumerals(1234_5678_9012_3456, { numeralsType: 'mega' })).toBe(
      '一千二百三十四万亿五千六百七十八亿九千零一十二万三千四百五十六'
    )
    expect(chinaNumerals(1234_5678_9012_3456, { type: 'upper', numeralsType: 'mega' })).toBe(
      '壹仟贰佰叁拾肆万亿伍仟陆佰柒拾捌亿玖仟零壹拾贰万叁仟肆佰伍拾陆'
    )
    expect(chinaNumerals(1e256, { numeralsType: 'mega' })).toBe('一穰')
    expect(chinaNumerals(1e256, { type: 'upper', numeralsType: 'mega' })).toBe('壹穰')
    expect(chinaNumerals(1e32, { numeralsType: 'mega', customUnits: '十百千万亿兆京' })).toBe('一京')
    expect(chinaNumerals(1e64, { numeralsType: 'mega', customUnits: '十百千万亿兆京' })).toBe('一京京')
    expect(chinaNumerals(1e100, { numeralsType: 'mega', customUnits: '十百千万亿兆京' })).toBe('一万京京京')
  })
  it('特殊数值', () => {
    expect(chinaNumerals(NaN)).toBe('NaN')
    expect(chinaNumerals(Infinity)).toBe('Infinity')
    expect(chinaNumerals(-Infinity)).toBe('-Infinity')
  })
  it('非法参数', () => {
    expect(() => chinaNumerals(1234, { type: 'custom' })).toThrow()
    expect(() => chinaNumerals(1234, { type: 'custom', customNumerals: '零壹贰叁肆伍陆柒捌' })).toThrow()
  })
})
