import { randomIntFloor } from './randomInt'
/**
 * 从给定的数组中返回随机一个元素
 * @param arr 可以是数组或类数组对象
 * @returns 从数组中随机选择的元素
 * @example
 * ```js
 * randomChoice([1, 2, 3]) // 1 2 3
 * randomChoice("abc") // "a" "b" "c"
 * ```
 */
export function randomChoice<T>(arr: ArrayLike<T>): T {
  return arr[randomIntFloor(0, arr.length)]
}
