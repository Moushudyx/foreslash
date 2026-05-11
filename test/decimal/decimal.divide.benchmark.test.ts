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

describe('ForeNumber 除法 benchmark', () => {
  benchmarkIt('在重复链式除法场景下满足性能预算', () => {
    const previous = ForeNumber.config()
    ForeNumber.config({ divisionPrecision: 220, rounding: 'round' })

    const startedAt = Date.now()
    let value = new ForeNumber('123456789.123456789')

    for (let i = 0; i < 5; i += 1) {
      value = value.div('3').div('7').div('13').div('29').mul('13').mul('29').mul('7').mul('3')
    }

    const elapsed = Date.now() - startedAt
    const diff = value.minus('123456789.123456789').abs()
    expect(diff.lessThan('1e-190')).toBe(true)
    expect(elapsed).toBeLessThan(5000)

    ForeNumber.config(previous)
  }, 15000)
})
