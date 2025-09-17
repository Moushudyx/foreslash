import { chunk } from '../../src'

describe('chunk', () => {
  it('基本功能', () => {
    expect(chunk([1, 2, 3])).toEqual([[1, 2], [3]])
    expect(chunk([1, 2, 3], 2)).toEqual([[1, 2], [3]])
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]])
    expect(chunk([1, 2, 3], 4)).toEqual([[1, 2, 3]])
    expect(chunk([1, 2, '3', 4, 5], 3)).toEqual([
      [1, 2, '3'],
      [4, 5],
    ])
    expect(chunk([1, 2, '3', 4, 5], Infinity)).toEqual([[1, 2, '3', 4, 5]])
  })
  it('非法参数测试', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([])
    expect(chunk([1, 2, 3], NaN)).toEqual([])
    expect(chunk([1, 2, 3], -123)).toEqual([])
  })
})
