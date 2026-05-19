/**
 * 构建产物冒烟测试 — UMD
 *
 * 验证打包后的 lib/index.umd.js 可以正确挂载 window.foreslash, 且核心函数可用
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// ═══════════════════ 读取 UMD 脚本内容 ═══════════════════

const umdPath = resolve(__dirname, '../../lib/index.umd.js')
const umdScript = readFileSync(umdPath, 'utf-8')

/**
 * 在 jsdom 中执行 UMD 脚本并返回 window.foreslash 对象\
 * jsdom 环境下通过 document.createElement('script') 添加的内联脚本可能不会自动执行\
 * 因此使用 window.eval() 在正确的全局上下文中执行\
 * 每次调用重新执行脚本, 避免状态污染
 */
function loadUMD(): Record<string, any> {
  // 使用 window.eval 确保在 jsdom 的全局作用域中执行, this 指向 window
  ;(window as any).eval(umdScript)
  const foreslash = (window as any).foreslash
  if (!foreslash) {
    throw new Error('UMD 脚本加载失败：window.foreslash 未定义')
  }
  return foreslash
}

// ═══════════════════ UMD 产物测试 ═══════════════════

describe('UMD 产物 (lib/index.umd.js)', () => {
  it('window.foreslash 应包含预期的导出符号', () => {
    const fs = loadUMD()
    expect(fs.compose).toBeTypeOf('function')
    expect(fs.chunk).toBeTypeOf('function')
    expect(fs.sleep).toBeTypeOf('function')
    expect(fs.isNumber).toBeTypeOf('function')
    expect(fs.clamp).toBeTypeOf('function')
    expect(fs.debounce).toBeTypeOf('function')
    expect(fs.deepClone).toBeTypeOf('function')
    expect(fs.noop).toBeTypeOf('function')
    expect(fs.pipe).toBeTypeOf('function')
    expect(fs.cartesianProduct).toBeTypeOf('function')
  })

  it('compose 函数组合', () => {
    const { compose } = loadUMD()
    const add = (a: number) => a + 1
    const square = (a: number) => a * a
    expect(compose(add)(2)).toBe(3)
    expect(compose(add, square)(2)).toBe(5)
    expect(compose(square, square, add)(2)).toBe(81)
  })

  it('chunk 分块', () => {
    const { chunk } = loadUMD()
    expect(chunk([1, 2, 3])).toEqual([[1, 2], [3]])
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]])
    expect(chunk([1, 2, 3], 0)).toEqual([])
  })

  it('sleep 延迟', async () => {
    const { sleep } = loadUMD()
    vi.useFakeTimers()
    try {
      let flag = false
      const p = sleep(100).then(() => { flag = true })
      expect(flag).toBe(false)
      await vi.advanceTimersByTimeAsync(60)
      expect(flag).toBe(false)
      await vi.advanceTimersByTimeAsync(50)
      await p
      expect(flag).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })

  it('isNumber 判断数字', () => {
    const { isNumber } = loadUMD()
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1.23)).toBe(true)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber('1.23')).toBe(false)
    expect(isNumber(null)).toBe(false)
  })

  it('clamp 数字限制', () => {
    const { clamp } = loadUMD()
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(NaN, 0, 10)).toBe(0)
  })

  it('多次调用 loadUMD 互不干扰', () => {
    const fs1 = loadUMD()
    const fs2 = loadUMD()
    expect(fs1).not.toBe(fs2) // 不同次加载的全局对象引用不同
  })
})
