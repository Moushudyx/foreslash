/**
 * 构建产物冒烟测试 — ESM + CJS
 *
 * 验证打包后的 index.mjs (ESM) 和 index.cmn.cjs (CJS) 均正常加载, 且核心函数行为正确
 */
import { describe, it, expect } from 'vitest'

/** 收集顶层导出符号 */
function getExportNames(ns: object): string[] {
  return Object.keys(ns).filter((k) => k !== 'default')
}

// ═══════════════════ ESM 产物测试 ═══════════════════

describe('ESM 产物 (lib/index.mjs)', () => {
  let mod: Record<string, any>

  beforeAll(async () => {
    // 静态 ESM import —— 验证打包器是否正确保留了 ES module 语义
    mod = (await import('../../lib/index.mjs')) as Record<string, any>
  })

  it('应包含预期的导出符号', () => {
    const names = getExportNames(mod)
    // 核心功能函数
    expect(names).toContain('compose')
    expect(names).toContain('pipe')
    expect(names).toContain('curry')
    expect(names).toContain('debounce')
    expect(names).toContain('throttle')
    expect(names).toContain('deepClone')
    expect(names).toContain('deepMerge')
    expect(names).toContain('isEmpty')
    // 各模块代表性导出
    expect(names).toContain('chunk') // array
    expect(names).toContain('sleep') // async
    expect(names).toContain('isNumber') // is
    expect(names).toContain('clamp') // number
    expect(names).toContain('cartesianProduct') // array
    expect(names).toContain('noop') // 顶层
    expect(names).toContain('pick') // 顶层
    expect(names).toContain('omit') // 顶层
  })

  it('compose 函数组合', () => {
    const { compose } = mod
    const add = (a: number) => a + 1
    const square = (a: number) => a * a
    expect(compose(add)(2)).toBe(3)
    expect(compose(add, square)(2)).toBe(5)
    expect(compose(square, square, add)(2)).toBe(81)
  })

  it('chunk 分块', () => {
    const { chunk } = mod
    expect(chunk([1, 2, 3])).toEqual([[1, 2], [3]])
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]])
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]])
    expect(chunk([1, 2, 3], 0)).toEqual([])
  })

  it('sleep 延迟', async () => {
    const { sleep } = mod
    vi.useFakeTimers()
    try {
      let flag = false
      const p = sleep(100).then(() => {
        flag = true
      })
      expect(flag).toBe(false)
      await vi.advanceTimersByTimeAsync(50)
      expect(flag).toBe(false)
      await vi.advanceTimersByTimeAsync(60)
      await p
      expect(flag).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })

  it('isNumber 判断数字', () => {
    const { isNumber } = mod
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1.23)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber('1.23')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
  })

  it('clamp 数字限制', () => {
    const { clamp } = mod
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(NaN, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10, { defaultMax: 6 })).toBe(6)
  })

  it('deepMerge 深度合并', () => {
    const { deepMerge } = mod
    const obj1 = { a: 1, b: { c: 2 }, d: [1, 2] }
    const obj2 = { b: { e: 3 }, d: [3], f: 4 }
    const merged = deepMerge(obj1, obj2)
    expect(merged).toEqual({ a: 1, b: { c: 2, e: 3 }, d: [1, 2, 3], f: 4 })
    expect(merged.b).not.toBe(obj1.b) // 深合并
    expect(merged.d).not.toBe(obj1.d) // 深合并
  })
})

// ═══════════════════ CJS 产物测试 ═══════════════════

describe('CJS 产物 (lib/index.cmn.cjs)', () => {
  let mod: Record<string, any>

  beforeAll(async () => {
    // Node.js 支持通过动态 import() 加载 CommonJS 模块
    mod = (await import('../../lib/index.cmn.cjs')) as Record<string, any>
  })

  it('应包含预期的导出符号', () => {
    const names = getExportNames(mod)
    expect(names).toContain('compose')
    expect(names).toContain('chunk')
    expect(names).toContain('sleep')
    expect(names).toContain('isNumber')
    expect(names).toContain('clamp')
    expect(names).toContain('debounce')
    expect(names).toContain('deepClone')
    expect(names).toContain('noop')
  })

  it('compose — 与 ESM 产物行为一致', () => {
    const { compose } = mod
    expect(compose((a: number) => a + 1)(2)).toBe(3)
  })

  it('chunk — 与 ESM 产物行为一致', () => {
    const { chunk } = mod
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]])
  })

  it('isNumber — 与 ESM 产物行为一致', () => {
    const { isNumber } = mod
    expect(isNumber(42)).toBe(true)
    expect(isNumber('42')).toBe(false)
  })

  it('deepMerge — 与 ESM 产物行为一致', () => {
    const { deepMerge } = mod
    const obj1 = { a: 1, b: { c: 2 }, d: [1, 2] }
    const obj2 = { b: { e: 3 }, d: [3], f: 4 }
    const merged = deepMerge(obj1, obj2)
    expect(merged).toEqual({ a: 1, b: { c: 2, e: 3 }, d: [1, 2, 3], f: 4 })
    expect(merged.b).not.toBe(obj1.b) // 深合并
    expect(merged.d).not.toBe(obj1.d) // 深合并
  })
})
