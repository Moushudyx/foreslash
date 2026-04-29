import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * 仅在显式请求时运行 benchmark
 */
const benchmarkIt = process.env.FORENUMBER_RUN_BENCHMARK === '1' ? it : it.skip

describe('ForeNumber 除法 benchmark', () => {
  benchmarkIt('在重复链式除法场景下满足性能预算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 220, rounding: 'round' })

    const startedAt = Date.now()
    let value = new ForeNumber('123456789')

    for (let i = 0; i < 6; i += 1) {
      value = value.div('3').div('7').div('13').div('29').mul('13').mul('29').mul('7').mul('3')
    }

    const elapsed = Date.now() - startedAt
    const diff = value.minus('123456789').abs()
    expect(diff.lessThan('1e-180')).toBe(true)
    expect(elapsed).toBeLessThan(12000)

    ForeNumber.config(previous)
  }, 15000)
})
