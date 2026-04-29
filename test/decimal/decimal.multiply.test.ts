import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * 记录用例开始前的全局上下文
 */
const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber 乘法', () => {
  it('支持精确乘法与别名方法', () => {
    expect(new ForeNumber('0.6').multiply('3').toString()).toBe('1.8')
    expect(new ForeNumber('12.5').mul('0.08').toString()).toBe('1')
  })

  it('支持负数乘法', () => {
    expect(new ForeNumber('-3').multiply('4').toString()).toBe('-12')
    expect(new ForeNumber('3').mul('-4').toString()).toBe('-12')
    expect(new ForeNumber('-3').mul('-4').toString()).toBe('12')
    expect(new ForeNumber('-0.5').mul('-0.5').toString()).toBe('0.25')
    expect(new ForeNumber('-1.5').mul('2').toString()).toBe('-3')
  })

  it('正确传播 NaN', () => {
    expect(new ForeNumber('NaN').multiply('5').toString()).toBe('NaN')
    expect(new ForeNumber('5').mul('NaN').toString()).toBe('NaN')
  })

  it('正确处理零乘法', () => {
    expect(new ForeNumber('0').multiply('12345').toString()).toBe('0')
    expect(new ForeNumber('12345').mul('0').toString()).toBe('0')
    expect(new ForeNumber('0').mul('0').toString()).toBe('0')
    expect(new ForeNumber('-0').mul('5').toString()).toBe('0')
  })

  it('正确处理 Infinity 与有限数的乘法', () => {
    expect(new ForeNumber('Infinity').multiply('2').toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').mul('-1').toString()).toBe('-Infinity')
    expect(new ForeNumber('-Infinity').mul('3').toString()).toBe('-Infinity')
    expect(new ForeNumber('-Infinity').mul('-2').toString()).toBe('Infinity')
  })

  it('正确处理 Infinity 与极大/极小有限数的乘法', () => {
    expect(new ForeNumber('Infinity').multiply('1e1000').toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').mul('-1e-1000').toString()).toBe('-Infinity')
  })

  it('正确处理 Infinity 链式乘法', () => {
    expect(new ForeNumber('Infinity').multiply('Infinity').toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').mul('-Infinity').toString()).toBe('-Infinity')
    expect(new ForeNumber('-Infinity').mul('-Infinity').toString()).toBe('Infinity')
  })

  it('在量级差距很大时保留极小值', () => {
    expect(new ForeNumber('1.234e12').multiply('9.876e-12').toString()).toBe('12.186984')
  })

  it('在乘法中正确处理特殊值', () => {
    expect(new ForeNumber('0').multiply('Infinity').toString()).toBe('NaN')
  })

  it('乘法结果保持有限数精度', () => {
    expect(new ForeNumber('123456789').mul('987654321').toString()).toBe('121932631112635269')
  })

  it('链式乘法保持稳定', () => {
    const value = new ForeNumber('1.5').mul('2').mul('3').mul('4')
    expect(value.toString()).toBe('36')
  })
})
