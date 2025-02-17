import { range } from '../../src'

describe('range', () => {
  it('基本功能', () => {
    // 默认功能
    expect(range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(range(-10)).toEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10])
    expect(range(1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(range(10, 1)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
    // 步长测试
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9])
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8, 10])
    expect(range(1, 10, -2)).toEqual([1, 3, 5, 7, 9])
    expect(range(0, 10, -2)).toEqual([0, 2, 4, 6, 8, 10])
    expect(range(10, 1, 2)).toEqual([10, 8, 6, 4, 2])
    // 复杂配置测试
    expect(range(1, 10, { step: -2, getter: (i) => i * 10 })).toEqual([10, 30, 50, 70, 90])
    expect(range(10, 1, { step: 2, getter: (i) => i * 10 })).toEqual([100, 80, 60, 40, 20])
    expect(range(0, 10, { getter: (i, existList) => (i < 2 ? i : existList[i - 1] + existList[i - 2]) })).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55,
    ])
    expect(range(1, 10, { step: 2, value: '1' })).toEqual(['1', '1', '1', '1', '1'])
  })
  it('非法参数测试', () => {
    // @ts-ignore
    expect(() => range()).toThrow()
    expect(() => range(NaN, 100)).toThrow()
    expect(() => range(100, NaN)).toThrow()
    expect(() => range(100, 1, 0)).toThrow()
    expect(() => range(100, 1, NaN)).toThrow()
  })
})
