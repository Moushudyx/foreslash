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

  it('支持负数加减法', () => {
    expect(new ForeNumber('-5').plus('3').toString()).toBe('-2')
    expect(new ForeNumber('-0.1').add('0.2').toString()).toBe('0.1')
    expect(new ForeNumber('3').plus('-5').toString()).toBe('-2')
    expect(new ForeNumber('-3').minus('-7').toString()).toBe('4')
    expect(new ForeNumber('-10').sub('3').toString()).toBe('-13')
    expect(new ForeNumber('5').minus('-3').toString()).toBe('8')
  })

  it('正确处理零的边界场景', () => {
    expect(new ForeNumber('0').plus('0').toString()).toBe('0')
    expect(new ForeNumber('0.1').add('0').toString()).toBe('0.1')
    expect(new ForeNumber('0').minus('0.1').toString()).toBe('-0.1')
    expect(new ForeNumber('0').sub('0').toString()).toBe('0')
    expect(new ForeNumber('-0').add('-0').toString()).toBe('0')
  })

  it('正确处理 NaN 传播', () => {
    expect(new ForeNumber('NaN').plus('5').toString()).toBe('NaN')
    expect(new ForeNumber('5').add('NaN').toString()).toBe('NaN')
    expect(new ForeNumber('NaN').minus('3').toString()).toBe('NaN')
    expect(new ForeNumber('3').sub('NaN').toString()).toBe('NaN')
  })

  it('正确处理 -Infinity 加减', () => {
    expect(new ForeNumber('-Infinity').plus('1').toString()).toBe('-Infinity')
    expect(new ForeNumber('1').add('-Infinity').toString()).toBe('-Infinity')
    expect(new ForeNumber('-Infinity').minus('1').toString()).toBe('-Infinity')
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
