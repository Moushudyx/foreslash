import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

describe('ForeNumber 框架基础', () => {
  it('能够解析有限小数与 bigint 输入', () => {
    expect(new ForeNumber('123.45').toString()).toBe('123.45')
    expect(new ForeNumber(BigInt('90071992547409931234')).toString()).toBe('90071992547409931234')
  })

  it('保持特殊值语义', () => {
    expect(new ForeNumber(Number.NaN).isNaN).toBe(true)
    expect(new ForeNumber(Number.POSITIVE_INFINITY).toString()).toBe('Infinity')
    expect(new ForeNumber(Number.NEGATIVE_INFINITY).toString()).toBe('-Infinity')
  })

  it('支持静态上下文配置', () => {
    const previous = ForeNumber.config()
    const next = ForeNumber.config({ divisionPrecision: 64, powerPrecision: 80 })
    expect(next.divisionPrecision).toBe(64)
    expect(next.powerPrecision).toBe(80)
    ForeNumber.config(previous)
  })

  it('仅为未完成功能保留显式占位', () => {
    const n = new ForeNumber('1.25')
    expect(n.plus('2').toString()).toBe('3.25')
    expect(n.mod('2').toString()).toBe('1.25')
    expect(() => n.toBinary(10)).toThrow(/尚未实现/)
  })
})
