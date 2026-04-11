import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * 记录用例开始前的全局上下文
 */
const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber 取模', () => {
  it('支持截断除法语义下的取模', () => {
    expect(new ForeNumber('10').modulo('3').toString()).toBe('1')
    expect(new ForeNumber('10').mod('3').toString()).toBe('1')
    expect(new ForeNumber('-10').mod('3').toString()).toBe('-1')
    expect(new ForeNumber('10').mod('-3').toString()).toBe('1')
    expect(new ForeNumber('-10').mod('-3').toString()).toBe('-1')
  })

  it('支持小数输入和巨大量级差下的取模', () => {
    expect(new ForeNumber('10.5').mod('0.2').toString()).toBe('0.1')
    expect(new ForeNumber('1.234e12').mod('9.876e-12').toString()).toBe('0.000000000003448')
  })

  it('在取模中正确处理特殊值', () => {
    expect(new ForeNumber('Infinity').mod('3').toString()).toBe('NaN')
    expect(new ForeNumber('3').mod('Infinity').toString()).toBe('3')
    expect(new ForeNumber('3').mod('0').toString()).toBe('NaN')
  })
})
