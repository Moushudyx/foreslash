/**
 * 使用 Fisher-Yates 算法打乱一个数组, 返回打乱后的新数组
 * @param arr 可以是一个数组或类数组对象
 * @returns 打乱后的新数组
 * @example
 * ```js
 * shuffle('abcdefg') // ['d', 'e', 'a', 'c', 'g', 'f', 'b']
 * shuffle([1, 2, 3, 4, 5, 6, 7, 8]) // [3, 2, 6, 5, 8, 1, 7, 4]
 * ```
 * @version 0.1.1
 */
export function shuffle<T>(arr: ArrayLike<T> | Iterable<T>): Array<T> {
  const array = Array.from(arr)
  if (array.length <= 1) return array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
