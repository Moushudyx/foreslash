import { IsNegative, IsZero } from '@src/types'

/**
 * 将一个数组或类数组对象分割成多个指定大小的小块\
 * 类似 Lodash 的 `chunk` 或是 Radash 的 `cluster`\
 * 可以填入 `size` 以自定义每个小块的大小
 * @param array 需要分块的数组
 * @param size 每块大小, 不能小于 1, 默认为 `2`
 * @returns 分块后的数组
 * @example
 * ```js
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * chunk('12345', 3) // [['1', '2', '3'], ['4', '5']]
 * chunk({0: 1, 1: 2, 2: 3, length: 3}, 2) // [[1, 2], [3]]
 * // 如果传入了不正常的 size 则返回空数组(类型为 `never[]`)
 * chunk([1, 2, 3, 4, 5], 0) // []
 * chunk([1, 2, 3, 4, 5], NaN) // []
 * ```
 * @version 0.3.2
 */
export function chunk<T, Size extends number = 2>(array: ArrayLike<T>, size: Size = 2 as Size): Chunked<T, Size> {
  const res: T[][] = []
  if (size < 1 || isNaN(size)) return res as Chunked<T, Size>
  let start = 0,
    end = size as number
  while (start < array.length) {
    res.push(Array.prototype.slice.call(array, start, end))
    start = end
    end += size
  }
  return res as Chunked<T, Size>
}
export type Chunked<T, Size extends number> = Size extends 1
  ? [T][]
  : Size extends 2
  ? [T, T][]
  : Size extends 3
  ? [T, T, T][]
  : Size extends 4
  ? [T, T, T, T][]
  : Size extends 5
  ? [T, T, T, T, T][]
  : Size extends 6
  ? [T, T, T, T, T, T][]
  : Size extends 7
  ? [T, T, T, T, T, T, T][]
  : Size extends 8
  ? [T, T, T, T, T, T, T, T][]
  : Size extends 9
  ? [T, T, T, T, T, T, T, T, T][]
  : IsNegative<Size> extends true
  ? never[]
  : Size extends 0
  ? never[]
  : T[][]
