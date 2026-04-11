import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * 记录用例开始前的全局上下文
 */
const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber 加减法', () => {
  it('支持精确加减法与别名方法', () => {
    expect(new ForeNumber('0.1').plus('0.2').toString()).toBe('0.3')
    expect(new ForeNumber('5.5').add('4.5').toString()).toBe('10')
    expect(new ForeNumber('10').minus('3.25').toString()).toBe('6.75')
    expect(new ForeNumber('10').sub('3.25').toString()).toBe('6.75')
  })

  it('在量级差距很大时保留极小值', () => {
    expect(new ForeNumber('1.234e12').plus('9.876e-12').toString()).toBe('1234000000000.000000000009876')
    expect(new ForeNumber('1.234e12').minus('9.876e-12').toString()).toBe('1233999999999.999999999990124')
  })

  it('在加减法中正确处理特殊值', () => {
    expect(new ForeNumber('Infinity').plus('1').toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').minus('Infinity').toString()).toBe('NaN')
  })
})
