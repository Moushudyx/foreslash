import { cartesianProduct } from '../../src'

describe('cartesianProduct', () => {
  it('基本功能', () => {
    expect(cartesianProduct([1, 2, 3])).toEqual([[1], [2], [3]])
    expect(cartesianProduct([1, 2], '12')).toEqual([
      [1, '1'],
      [1, '2'],
      [2, '1'],
      [2, '2'],
    ])
    expect(cartesianProduct([1, 2], '12', { 0: 3, 1: 4, length: 2 })).toEqual([
      [1, '1', 3],
      [1, '1', 4],
      [1, '2', 3],
      [1, '2', 4],
      [2, '1', 3],
      [2, '1', 4],
      [2, '2', 3],
      [2, '2', 4],
    ])
  })
  it('空集与其他集合的笛卡尔积是空集', () => {``
    expect(cartesianProduct([])).toEqual([])
    expect(cartesianProduct([1, 2], '12', { 0: 3, 1: 4, length: 2 }, '')).toEqual([])
    expect(cartesianProduct([], '12', { 0: 3, 1: 4, length: 2 }, '456')).toEqual([])
    expect(cartesianProduct([4, 5], '123', { length: 0 }, '456')).toEqual([])
  })
})
