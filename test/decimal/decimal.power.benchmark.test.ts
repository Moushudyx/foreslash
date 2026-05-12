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

describe('ForeNumber 幂运算 benchmark', () => {
  benchmarkIt(
    '在有理数幂场景下满足性能预算',
    () => {
      const previous = ForeNumber.config()
      ForeNumber.config({ powerPrecision: 24, precision: 24, rounding: 'round', realPowerMode: 'approx' })
      const testExample: [base: number | string, pow: number | string, expected: string][] = [
        ['81', 0.75, '27'],
        ['0.0001', 0.5, '0.01'],
        [123, 12, '11991163848716906297072721'],
        ['256', 1.25, '1024'],
        [20, '-1', '0.05'],
        ['-27', '1/3', '-3'],
        [-8, '2/3', '4'],
        [5, '-2', '0.04'],
        [1, '1e1145141919810', '1'],
        [1, '11145141919810', '1'],
        [-1, 6372843281945, '-1'],
        [-1, '6372843281945e123456789', '1'],
        [0, 123456789, '0'],
        [0, '123456789e123456789', '0'],
      ]
      const results: string[] = []
      const startedAt = Date.now()

      for (const [base, pow, expected] of testExample) {
        const result = new ForeNumber(base).pow(pow).toString()
        results.push(result)
      }

      const elapsed = Date.now() - startedAt

      expect(elapsed).toBeLessThan(5000)
      expect(results).toEqual(testExample.map(([, , expected]) => expected))

      ForeNumber.config(previous)
    },
    10000
  )

  benchmarkIt(
    '在一般实数幂长小数指数路径下满足性能预算',
    () => {
      const previous = ForeNumber.config()
      ForeNumber.config({ powerPrecision: 24, precision: 24, rounding: 'round', realPowerMode: 'approx' })
      const testExample: [base: number | string, pow: number | string, expected: string][] = [
        [9, '0.12346789', '1.31161905118273254911552'],
        ['1.23', '0.987654321', '1.22686046511647851239471'],
        ['12345678900000000000', '-0.123456789', '0.00439564756059676906407180'], // 精确到 24 位 0.004395647560596769064071799658322...
        [9.8, 12.34567, '1727229416587.69273870978'] // 精确到 24 位 1727229416587.6927387097774...
      ]
      const results: string[] = []
      const startedAt = Date.now()

      for (const [base, pow, expected] of testExample) {
        const result = new ForeNumber(base).pow(pow).toString()
        results.push(result)
      }

      const elapsed = Date.now() - startedAt

      expect(elapsed).toBeLessThan(5000)
      expect(results).toEqual(testExample.map(([, , expected]) => expected))

      ForeNumber.config(previous)
    },
    10000
  )

  benchmarkIt(
    '在极端链式幂场景下满足性能预算',
    () => {
      const previous = ForeNumber.config()
      ForeNumber.config({ powerPrecision: 260, rounding: 'round' })

      const startedAt = Date.now()
      new ForeNumber('12346789').pow('-12').pow('3').pow('4')
      const elapsed = Date.now() - startedAt

      expect(elapsed).toBeLessThan(15000)

      ForeNumber.config(previous)
    },
    10000
  )
})
