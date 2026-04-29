import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * transcendental 路径的轻量基准回归
 * 该用例用于观察不同精度配置下的误差与耗时趋势
 */
describe('ForeNumber transcendental 基准回归', () => {
  it('在不同精度下保持可接受误差并控制耗时', () => {
    const previous = ForeNumber.config()

    const samples = [
      { base: '2', exponent: '1.1' },
      { base: '3', exponent: '0.12345' },
      { base: '10', exponent: '0.5' },
      { base: '1.2345', exponent: '2.75' }
    ] as const

    const levels = [
      { precision: 20, powerPrecision: 20 },
      { precision: 24, powerPrecision: 24 },
      { precision: 28, powerPrecision: 28 }
    ] as const

    const levelMaxErrors: number[] = []
    const startedAt = Date.now()

    for (const level of levels) {
      ForeNumber.config({
        realPowerMode: 'approx',
        rounding: 'round',
        precision: level.precision,
        powerPrecision: level.powerPrecision
      })

      let levelMaxError = 0
      for (const sample of samples) {
        const actual = new ForeNumber(sample.base).pow(sample.exponent).toNumber()
        const expected = Math.pow(Number(sample.base), Number(sample.exponent))
        levelMaxError = Math.max(levelMaxError, Math.abs(actual - expected))
      }

      levelMaxErrors.push(levelMaxError)
    }

    const elapsed = Date.now() - startedAt
    const maxError = Math.max(...levelMaxErrors)

    expect(maxError).toBeLessThan(1e-10)
    expect(levelMaxErrors[2]).toBeLessThanOrEqual(levelMaxErrors[0] * 1.1)
    expect(elapsed).toBeLessThan(6000)

    ForeNumber.config(previous)
  }, 12000)
})
