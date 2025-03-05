/**
 * 根据给定的条件来移除数组中的元素(不会影响原数组)
 * @param arr 需要移除部分元素的数组
 * @param item 需要移除的元素, 或判断某个元素是否应该移除的函数
 * @returns 返回移除后的新数组
 * @example
 * ```js
 * // 基本用法
 * remove([1, 2, 3, 4, 5], 5) // [1, 2, 3, 4]
 * remove([1, 2, 3, 4, 5], (num) => num % 2) // [1, 3, 5]
 * // 可以传入多个过滤条件
 * remove([1, 2, 3, 4, 5], 3, 4, 5) // [1, 2]
 * remove([1, 2, 3, 4, 5], (num) => num % 2, (num) => num > 4) // [1, 3]
 * // 可以混合传入过滤条件
 * remove([1, 2, 3, 4, 5], (num) => num % 2, (num) => num > 4, 3) // [1]
 * ```
 * @version 0.2.2
 */
export function remove<T>(arr: ArrayLike<T>, ...item: (T | ((val: T) => unknown))[]): T[] {
  const removeSet: Set<T> = new Set()
  const judgerList: Array<(val: T) => boolean> = []
  for (let i = 0; i < item.length; i++) {
    const cond = item[i]
    if (typeof cond === 'function') judgerList.push(cond as (val: T) => boolean)
    else removeSet.add(cond)
  }
  const res: T[] = []
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    if (removeSet.has(el) || judgerList.some((judger) => judger(el))) continue
    res.push(el)
  }
  return res
}
