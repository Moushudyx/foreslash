import { clamp } from '../../src'

describe('clamp', () => {
  it('基本功能', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(15, 0, 10)).toBe(10)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(NaN, 0, 10)).toBe(0)
    // default 测试
    expect(clamp(5, 0, 10, { default: 6 })).toBe(5)
    expect(clamp(15, 0, 10, { default: 6 })).toBe(6)
    expect(clamp(-5, 0, 10, { default: 6 })).toBe(6)
    expect(clamp(NaN, 0, 10, { default: 6 })).toBe(6)
    // defaultMin 测试
    expect(clamp(5, 0, 10, { defaultMin: 6 })).toBe(5)
    expect(clamp(15, 0, 10, { defaultMin: 6 })).toBe(10)
    expect(clamp(-5, 0, 10, { defaultMin: 6 })).toBe(6)
    expect(clamp(NaN, 0, 10, { defaultMin: 6 })).toBe(6)
    // defaultMax 测试
    expect(clamp(5, 0, 10, { defaultMax: 6 })).toBe(5)
    expect(clamp(15, 0, 10, { defaultMax: 6 })).toBe(6)
    expect(clamp(-5, 0, 10, { defaultMax: 6 })).toBe(0)
    expect(clamp(NaN, 0, 10, { defaultMax: 6 })).toBe(0)
    // 混合测试 defaultMin 覆盖 default
    expect(clamp(5, 0, 10, { default: 6, defaultMin: 7 })).toBe(5)
    expect(clamp(15, 0, 10, { default: 6, defaultMin: 7 })).toBe(6)
    expect(clamp(-5, 0, 10, { default: 6, defaultMin: 7 })).toBe(7)
    expect(clamp(NaN, 0, 10, { default: 6, defaultMin: 7 })).toBe(7)
    // 混合测试 defaultMax 覆盖 default
    expect(clamp(5, 0, 10, { default: 6, defaultMax: 7 })).toBe(5)
    expect(clamp(15, 0, 10, { default: 6, defaultMax: 7 })).toBe(7)
    expect(clamp(-5, 0, 10, { default: 6, defaultMax: 7 })).toBe(6)
    expect(clamp(NaN, 0, 10, { default: 6, defaultMax: 7 })).toBe(6)
  })
  it('错误参数测试', () => {
    // 自动纠正 min > max
    expect(clamp(5, 10, 0)).toBe(5)
    expect(clamp(15, 10, 0)).toBe(10)
    expect(clamp(-5, 10, 0)).toBe(0)
  })
  it('非法参数测试', () => {
    expect(() => clamp(0, NaN, 10)).toThrow()
    expect(() => clamp(-1, 0, NaN)).toThrow()
  })
})
