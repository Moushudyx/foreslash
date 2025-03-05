import { remove } from '../../src'

describe('remove', () => {
  it('基本功能', () => {
    // 基本用法
    expect(remove([1, 2, 3, 4, 5], 5)).toEqual([1, 2, 3, 4])
    expect(remove([1, 2, 3, 4, 5], (num) => num % 2)).toEqual([2, 4])
    expect(remove([1, 2, 3, 4, 5], (num) => num % 2 === 0)).toEqual([1, 3, 5])
    // 可以传入多个过滤条件
    expect(remove([1, 2, 3, 4, 5], 3, 4, 5)).toEqual([1, 2])
    expect(
      remove(
        [1, 2, 3, 4, 5],
        (num) => num % 2 === 0,
        (num) => num > 4
      )
    ).toEqual([1, 3])
    // 可以混合传入过滤条件
    expect(
      remove(
        [1, 2, 3, 4, 5],
        (num) => num % 2 === 0,
        (num) => num > 4,
        3
      )
    ).toEqual([1])
    // 类数组对象测试
    expect(remove({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }, 5)).toEqual([1, 2, 3, 4])
    expect(remove({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }, (num) => num % 2 === 0)).toEqual([1, 3, 5])
    expect(
      remove(
        { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 },
        (num) => num % 2 === 0,
        (num) => num > 4,
        3
      )
    ).toEqual([1])
  })
})
