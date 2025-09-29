import { isArray, isNumber } from '../is'
/**
 * 用线性插值法求取一个中间值
 * @param val1 第一个值, 当 权重=0 时返回的将是这个值, 可以是数组或二维数组
 * @param val2 第二个值, 当 权重=0 时返回的将是这个值, 可以是数组或二维数组
 * @param t 权重
 * @example
 * ```js
 * // 传入数值
 * lerp(1, 2, 0) // 1
 * lerp(1, 2, 0.5) // 1.5
 * lerp(1, 2, 1) // 2
 * lerp(1, 2, 3) // 4
 *
 * // 传入数组(数组长度必须一致否则会报错)
 * lerp([1, 2], [2, 4], 0.5) // [1.5, 3]
 *
 * // 传入二维数组(数组长度必须一致否则会报错)
 * lerp(
 *   [
 *     [1, 2],
 *     [3, 4],
 *   ],
 *   [
 *     [11, 12],
 *     [13, 14],
 *   ],
 *   0.5
 * )
 * // [
 * //   [6, 7],
 * //   [8, 9],
 * // ]
 * ```
 * @version 0.3.3
 */
export function lerp(val1: number, val2: number, t: number): number
export function lerp(val1: [number], val2: [number], t: number): [number]
export function lerp(val1: [number, number], val2: [number, number], t: number): [number, number]
export function lerp(
  val1: [number, number, number],
  val2: [number, number, number],
  t: number
): [number, number, number]
export function lerp(
  val1: [number, number, number, number],
  val2: [number, number, number, number],
  t: number
): [number, number, number, number]
export function lerp(
  val1: [number, number, number, number, number],
  val2: [number, number, number, number, number],
  t: number
): [number, number, number, number, number]
export function lerp(
  val1: [number, number, number, number, number, number],
  val2: [number, number, number, number, number, number],
  t: number
): [number, number, number, number, number, number]
export function lerp(
  val1: [number, number, number, number, number, number, number],
  val2: [number, number, number, number, number, number, number],
  t: number
): [number, number, number, number, number, number, number]
export function lerp(
  val1: [number, number, number, number, number, number, number, number],
  val2: [number, number, number, number, number, number, number, number],
  t: number
): [number, number, number, number, number, number, number, number]
export function lerp(val1: number[], val2: number[], t: number): number[]
export function lerp(val1: number[][], val2: number[][], t: number): number[][]
export function lerp(
  val1: number | number[] | number[][],
  val2: number | number[] | number[][],
  t: number
): number | number[] | number[][] {
  if (isNumber(val1)) {
    // 纯数字
    if (!isNumber(val2)) throw new Error('Invalid val2 parameter: val2 should be a number')
    return _lerp(val1, val2, t)
  } else if (isArray(val1)) {
    // 数组
    if (!isArray(val2)) throw new Error('Invalid val2 parameter: val2 should be an Array')
    if (val1.length !== val2.length) {
      throw new Error(
        `Invalid val2 parameter: the length of val2 (${val2.length}) should be consistent with val1 (${val1.length})`
      )
    }
    if (val1.length === 0) return [] // 空数组不做处理
    // 区分一维和二维
    if (isNumber(val1[0])) {
      if (!isNumber(val2[0])) throw new Error('Invalid val2 parameter: val2 should be an Array<number>')
      return (val1 as number[]).map((v1, index) => _lerp(v1, (val2 as number[])[index], t))
    } else if (isArray(val1[0])) {
      const res: number[][] = []
      for (let i = 0; i < val1.length; i++) {
        const arr1 = (val1 as number[][])[i]
        const arr2 = (val2 as number[][])[i]
        if (arr1.length !== arr2.length) {
          throw new Error(
            `Invalid val2 parameter: The length of array at index ${i} in val2 (${arr2.length}) must match the length of the corresponding array in val1 (${arr1.length})`
          )
        }
        res.push(arr1.map((v1, index) => _lerp(v1, arr2[index], t)))
      }
      return res
    }
  }
  // 其他输入
  throw new Error('Invalid val1 parameter: val1 should be a number or Array')
}
function _lerp(val1: number, val2: number, t: number) {
  return val1 + (val2 - val1) * t
}
// 生成函数重载声明的脚本
// with (foreslash) {
//   const gfn = (num) => {
//     const arr = range(1, num, { getter: (n) => 'T' + n })
//     return `export function lerp<${arr.join(', ')}>(${range(1, num, {
//       getter: (n) => `arr${n}: ArrayLike<T${n}>`,
//     }).join(', ')}): [${arr.join(', ')}][]`
//   }
//   const arr = range(1, 8)
//   console.log(arr.map((n) => gfn(n)).join('\n'))
// }
// // 会打印:
// // export function lerp(val1: [number], val2: [number], t: number): [number]
// // export function lerp(val1: [number, number], val2: [number, number], t: number): [number, number]
// // ...
