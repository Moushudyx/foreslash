import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

describe('ForeNumber framework scaffold', () => {
  it('parses finite decimal and bigint input', () => {
    expect(new ForeNumber('123.45').toString()).toBe('123.45')
    expect(new ForeNumber(BigInt('90071992547409931234')).toString()).toBe('90071992547409931234')
  })

  it('keeps special values', () => {
    expect(new ForeNumber(Number.NaN).isNaN).toBe(true)
    expect(new ForeNumber(Number.POSITIVE_INFINITY).toString()).toBe('Infinity')
    expect(new ForeNumber(Number.NEGATIVE_INFINITY).toString()).toBe('-Infinity')
  })

  it('supports static context config', () => {
    const previous = ForeNumber.config()
    const next = ForeNumber.config({ divisionPrecision: 64, powerPrecision: 80 })
    expect(next.divisionPrecision).toBe(64)
    expect(next.powerPrecision).toBe(80)
    ForeNumber.config(previous)
  })

  it('keeps explicit placeholders only for unfinished features', () => {
    const n = new ForeNumber('1.25')
    expect(n.plus('2').toString()).toBe('3.25')
    expect(n.mod('2').toString()).toBe('1.25')
    expect(() => n.toBinary(10)).toThrow(/尚未实现/)
  })
})
