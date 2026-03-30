import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber power', () => {
  it('supports integer power and alias', () => {
    expect(new ForeNumber('2').power('10').toString()).toBe('1024')
    expect(new ForeNumber('2').pow('10').toString()).toBe('1024')
    expect(new ForeNumber('-2').pow('3').toString()).toBe('-8')
    expect(new ForeNumber('-2').pow('4').toString()).toBe('16')
    expect(new ForeNumber('1.234e12').pow('2').toString()).toBe('1522756000000000000000000')
  })

  it('supports negative integer power with powerPrecision', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 16, rounding: 'round' })

    expect(new ForeNumber('2').pow('-3').toString()).toBe('0.125')
    expect(new ForeNumber('3').pow('-2').toString()).toBe('0.1111111111111111')

    ForeNumber.config(previous)
  })

  it('handles extreme chained powers without hanging', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 260, rounding: 'round' })

    const startedAt = Date.now()
    const value = new ForeNumber('12346789').pow('-12').pow('3').pow('4')
    const elapsed = Date.now() - startedAt

    expect(value.toString()).not.toBe('NaN')
    expect(elapsed).toBeLessThan(6000)

    ForeNumber.config(previous)
  }, 12000)

  it('handles special values in power', () => {
    expect(new ForeNumber('Infinity').pow('2').toString()).toBe('Infinity')
    expect(new ForeNumber('Infinity').pow('-1').toString()).toBe('0')
    expect(new ForeNumber('0').pow('-1').toString()).toBe('Infinity')
    expect(new ForeNumber('NaN').pow('0').toString()).toBe('1')
  })

  it('throws on non-integer exponent in current stage', () => {
    expect(() => new ForeNumber('9').pow('0.5')).toThrow(/非整数幂尚未实现/)
  })
})
