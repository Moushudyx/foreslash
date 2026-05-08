import { afterEach, describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

const defaultContext = ForeNumber.config()
afterEach(() => ForeNumber.config(defaultContext))

describe('四则运算极端场景测试', () => {
  it('乘法极端场景测试', () => {
    ForeNumber.config({ precision: 120, rounding: 'round' })
    expect(new ForeNumber('123456789123456789.12345').mul('987654321987654321.98765').toString()).toBe(
      '121932631356500531591061192939793292.7052253925'
    )
    expect(new ForeNumber('12345678912345.678912345').mul('9876543219876543219876.5').toString()).toBe(
      '121932631356500531591061192939793292.7052253925'
    )
    expect(
      new ForeNumber('1.000000000000000000900000000000000000007e96')
        .mul('1.234187438416378214613123532137698021395134031231321343824e-50')
        .toString()
    ).toBe('12341874384163782157238922267124384145555845222.24164210581912492833153095591365938218619249406768')
    expect(new ForeNumber('1e123456789').mul('2e123456789').eq('2e246913578')).toBe(true)
  })

  it('除法极端场景测试', () => {
    ForeNumber.config({ precision: 120, rounding: 'round' })
    expect(new ForeNumber('11210748209240427610562540240815689').div('0.112233445566778899').toString()).toBe(
      '99887766544332211000000000000000000'
    )
    expect(new ForeNumber('2.674026505541456759323769409041863790514075').div('543792657487328579325').toString()).toBe(
      '0.000000000000000000004917364125321546381431'
    )
    expect(new ForeNumber('1e-123456789').div('1e123456789').eq('1e-246913578')).toBe(true)
  })
})
