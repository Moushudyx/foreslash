import { describe, expect, it } from 'vitest'
import { ForeNumber } from '../../src/decimal'

/**
 * Benchmark 执行策略, 必须遵守:
 * 1. 仅允许通过 scripts/run-vitest-guarded.mjs 运行; 直接调用 vitest 且启用 benchmark 时会直接报错
 * 2. 严禁通过心跳输出、缩减样本、减少循环、放宽阈值等方式作弊
 * 3. benchmark 的功能是暴露真实性能瓶颈, 任何规避压力的修改都视为作弊
 */
const isGuardedRunner = process.env.FORESLASH_VITEST_GUARDED === '1'
if (process.env.FORENUMBER_RUN_BENCHMARK === '1' && !isGuardedRunner) {
  throw new Error('[Benchmark Guard] benchmark 只能通过 scripts/run-vitest-guarded.mjs 执行，禁止直接运行 vitest。')
}

/**
 * 仅在显式请求时运行 benchmark
 */
const benchmarkIt = process.env.FORENUMBER_RUN_BENCHMARK === '1' ? it : it.skip

/**
 * transcendental 路径的轻量基准回归
 * 该用例用于观察不同精度配置下的误差与耗时趋势
 */
describe('ForeNumber transcendental 基准回归', () => {
  benchmarkIt('在不同精度下保持可接受误差并控制耗时', () => {
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
    expect(elapsed).toBeLessThan(15000)

    ForeNumber.config(previous)
  }, 12000)
})
