import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const defaultContext = ForeNumber.config()

afterEach(() => {
  ForeNumber.config(defaultContext)
})

describe('ForeNumber multiply', () => {
  it('supports exact multiplication with aliases', () => {
    expect(new ForeNumber('0.6').multiply('3').toString()).toBe('1.8')
    expect(new ForeNumber('12.5').mul('0.08').toString()).toBe('1')
  })

  it('preserves tiny values when magnitudes differ greatly', () => {
    expect(new ForeNumber('1.234e12').multiply('9.876e-12').toString()).toBe('12.186984')
  })

  it('handles special values in multiplication', () => {
    expect(new ForeNumber('0').multiply('Infinity').toString()).toBe('NaN')
  })
})
