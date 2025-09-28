import { lerp } from '../../src'

describe('lerp', () => {
  it('基本测试', () => {
    expect(lerp(1, 2, 0)).toBe(1)
    expect(lerp(1, 2, 1)).toBe(2)
    expect(lerp(1, 2, 0.5)).toBe(1.5)
    expect(lerp(1, 2, 3)).toBe(4)
    // 数组
    expect(lerp([1, 2], [2, 4], 0)).toEqual([1, 2])
    expect(lerp([1, 2], [2, 4], 1)).toEqual([2, 4])
    expect(lerp([1, 2], [2, 4], 0.5)).toEqual([1.5, 3])
    expect(lerp([], [], 0.5)).toEqual([])
    // 二维数组
    expect(
      lerp(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [11, 12],
          [13, 14],
        ],
        0.5
      )
    ).toEqual([
      [6, 7],
      [8, 9],
    ])
  })
  it('非法参数测试', () => {
    // @ts-ignore
    expect(() => lerp(1, '2', 123)).toThrow()
    // @ts-ignore
    expect(() => lerp('1', 2, 123)).toThrow()
    // @ts-ignore
    expect(() => lerp(1, [2], 123)).toThrow()
    // @ts-ignore
    expect(() => lerp([1, 2], 2, 123)).toThrow()
    // @ts-ignore
    expect(() => lerp([[1]], [2], 123)).toThrow()
    // @ts-ignore
    expect(() => lerp([1], [[2]], 123)).toThrow()
    // 长度不一致测试
    expect(() => lerp([], [2], 123)).toThrow()
    expect(() => lerp([1, 2], [2], 123)).toThrow()
    expect(() => lerp([[1, 2]], [[2]], 123)).toThrow()
    expect(() => lerp([[1, 2]], [[1], [2]], 123)).toThrow()
  })
})
