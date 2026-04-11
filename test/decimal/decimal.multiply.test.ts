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

  it('在量级差距很大时保留极小值', () => {
    expect(new ForeNumber('1.234e12').multiply('9.876e-12').toString()).toBe('12.186984')
  })

  it('在乘法中正确处理特殊值', () => {
    expect(new ForeNumber('0').multiply('Infinity').toString()).toBe('NaN')
  })
})
