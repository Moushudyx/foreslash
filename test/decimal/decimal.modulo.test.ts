import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber modulo', () => {
  it('supports modulo with truncating semantics (same sign as dividend)', () => {
    expect(new ForeNumber('10').modulo('3').toString()).toBe('1')
    expect(new ForeNumber('10').mod('3').toString()).toBe('1')
    expect(new ForeNumber('-10').mod('3').toString()).toBe('-1')
    expect(new ForeNumber('10').mod('-3').toString()).toBe('1')
    expect(new ForeNumber('-10').mod('-3').toString()).toBe('-1')
  })

  it('supports modulo for decimal inputs and huge magnitude gaps', () => {
    expect(new ForeNumber('10.5').mod('0.2').toString()).toBe('0.1')
    expect(new ForeNumber('1.234e12').mod('9.876e-12').toString()).toBe('0.000000000003448')
  })

  it('handles special values in modulo', () => {
    expect(new ForeNumber('Infinity').mod('3').toString()).toBe('NaN')
    expect(new ForeNumber('3').mod('Infinity').toString()).toBe('3')
    expect(new ForeNumber('3').mod('0').toString()).toBe('NaN')
  })
})
