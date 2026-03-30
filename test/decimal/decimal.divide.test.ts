import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber divide', () => {
  it('supports division with context-controlled precision', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 20, rounding: 'round' })

    expect(new ForeNumber('1').dividedBy('8').toString()).toBe('0.125')
    expect(new ForeNumber('1').div('3').toString()).toBe('0.33333333333333333333')
    expect(new ForeNumber('123.45').div('2').toString()).toBe('61.725')

    ForeNumber.config({ divisionPrecision: 2, rounding: 'round' })
    expect(new ForeNumber('123.45').div('2').toString()).toBe('61.73')

    ForeNumber.config(previous)
  })

  it('handles extreme exponent gaps in division without dropping scale', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 24, rounding: 'round' })

    expect(new ForeNumber('1.234e12').div('2.5e-12').toString()).toBe('493600000000000000000000')
    expect(new ForeNumber('9.876e-12').div('1.234e12').toString()).toBe('0.000000000000000000000008')

    ForeNumber.config(previous)
  })

  it('keeps precision in chained divide/multiply roundtrip', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 180, rounding: 'round' })

    const value = new ForeNumber('123456789')
      .div('3')
      .div('7')
      .div('13')
      .div('29')
      .mul('13')
      .mul('29')
      .mul('7')
      .mul('3')

    expect(value.toString()).toBe('123456789')

    ForeNumber.config(previous)
  })

  it('does not hang in repeated chained division scenarios', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 220, rounding: 'round' })

    const startedAt = Date.now()
    let value = new ForeNumber('123456789')

    for (let i = 0; i < 6; i += 1) {
      value = value.div('3').div('7').div('13').div('29').mul('13').mul('29').mul('7').mul('3')
    }

    const elapsed = Date.now() - startedAt
    expect(value.toString()).toBe('123456789')
    expect(elapsed).toBeLessThan(6000)

    ForeNumber.config(previous)
  }, 12000)

  it('handles special values in division', () => {
    expect(new ForeNumber('1').div('0').toString()).toBe('Infinity')
    expect(new ForeNumber('0').div('0').toString()).toBe('NaN')
  })
})
