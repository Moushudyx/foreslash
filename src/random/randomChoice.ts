import { randomIntFloor } from './randomInt'
/**
 * 从给定的数组中返回随机一个元素
 * @param arr 可以是数组或类数组对象
 * @param weights 可选, 指定数组中每一项的权重, 若短于数组则缺失的部分视为 0
 * @returns 从数组中随机选择的元素
 * @example
 * ```js
 * randomChoice([1, 2, 3]) // 1 2 3
 * randomChoice("abc") // "a" "b" "c"
 * randomChoice("abc", [1, 2, 3]) // "b" "a" "c" "c" "b" "c" ...
 * ```
 */
export function randomChoice<T>(arr: ArrayLike<T>, weights?: ArrayLike<number>): T {
  if (!weights || !weights.length) return arr[randomIntFloor(0, arr.length)]
  let sum = 0
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i] ? weights[i] : 0;
    cumulativeWeights.push(sum);
  }
  const randomWeight = Math.random() * sum;
  const index = cumulativeWeights.findIndex(weight => weight > randomWeight);
  return arr[index];
}
