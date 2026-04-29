import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * 仅在显式请求时运行 benchmark
 */
const benchmarkIt = process.env.FORENUMBER_RUN_BENCHMARK === '1' ? it : it.skip

describe('ForeNumber 幂运算 benchmark', () => {
  benchmarkIt('在一般实数幂长小数指数路径下满足性能预算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 24, precision: 24, rounding: 'round', realPowerMode: 'approx' })

    const startedAt = Date.now()
    for (let index = 0; index < 4; index += 1) {
      const value = new ForeNumber('9').pow('0.123456789123456789')
      expect(value.isFinite).toBe(true)
    }
    const elapsed = Date.now() - startedAt

    expect(elapsed).toBeLessThan(15000)

    ForeNumber.config(previous)
  }, 15000)

  benchmarkIt('在重复有理数幂分发场景下满足性能预算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 48, precision: 56, rounding: 'round' })

    const startedAt = Date.now()
    for (let index = 0; index < 24; index += 1) {
      new ForeNumber('81').pow('3/4')
      new ForeNumber('81').pow('0.75')
      new ForeNumber('81').pow('-1/2')
    }
    const elapsed = Date.now() - startedAt

    expect(elapsed).toBeLessThan(15000)

    ForeNumber.config(previous)
  }, 15000)

  benchmarkIt('在极端链式幂场景下满足性能预算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ powerPrecision: 260, rounding: 'round' })

    const startedAt = Date.now()
    new ForeNumber('12346789').pow('-12').pow('3').pow('4')
    const elapsed = Date.now() - startedAt

    expect(elapsed).toBeLessThan(15000)

    ForeNumber.config(previous)
  }, 15000)
})
