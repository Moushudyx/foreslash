/**
 * 将多个数组或类数组对象以笛卡尔积的形式拼接为一个新的二维数组
 * @returns 笛卡尔积
 * @example
 * ```js
 * cartesianProduct([1, 2, 3, 4, 5]) // [[1], [2], [3], [4], [5]]
 * cartesianProduct([1, 2], '12') // [[1, '1'], [1, '2'], [2, '1'], [2, '2']]
 * cartesianProduct([1, 2], '12', [3, 4])
 * // [[1, '1', 3], [1, '1', 4], [1, '2', 3], [1, '2', 4]
 * //  [2, '1', 3], [2, '1', 4], [2, '2', 3], [2, '2', 4]]
 * cartesianProduct([1, 2, 3, 4, 5], '12345', []) // [] 空集与其他集合的笛卡尔积是空集
 * ```
 * @version 0.3.2
 */
export function cartesianProduct<T>(arr1: ArrayLike<T>): [T][]
export function cartesianProduct<T1, T2>(arr1: ArrayLike<T1>, arr2: ArrayLike<T2>): [T1, T2][]
export function cartesianProduct<T1, T2, T3>(
  arr1: ArrayLike<T1>,
  arr2: ArrayLike<T2>,
  arr3: ArrayLike<T3>
): [T1, T2, T3][]
export function cartesianProduct<T1, T2, T3, T4>(
  arr1: ArrayLike<T1>,
  arr2: ArrayLike<T2>,
  arr3: ArrayLike<T3>,
  arr4: ArrayLike<T4>
): [T1, T2, T3, T4][]
export function cartesianProduct<T1, T2, T3, T4, T5>(
  arr1: ArrayLike<T1>,
  arr2: ArrayLike<T2>,
  arr3: ArrayLike<T3>,
  arr4: ArrayLike<T4>,
  arr5: ArrayLike<T5>
): [T1, T2, T3, T4, T5][]
export function cartesianProduct<T1, T2, T3, T4, T5, T6>(
  arr1: ArrayLike<T1>,
  arr2: ArrayLike<T2>,
  arr3: ArrayLike<T3>,
  arr4: ArrayLike<T4>,
  arr5: ArrayLike<T5>,
  arr6: ArrayLike<T6>
): [T1, T2, T3, T4, T5, T6][]
export function cartesianProduct<T1, T2, T3, T4, T5, T6, T7>(
  arr1: ArrayLike<T1>,
  arr2: ArrayLike<T2>,
  arr3: ArrayLike<T3>,
  arr4: ArrayLike<T4>,
  arr5: ArrayLike<T5>,
  arr6: ArrayLike<T6>,
  arr7: ArrayLike<T7>
): [T1, T2, T3, T4, T5, T6, T7][]
export function cartesianProduct<T1, T2, T3, T4, T5, T6, T7, T8>(
  arr1: ArrayLike<T1>,
  arr2: ArrayLike<T2>,
  arr3: ArrayLike<T3>,
  arr4: ArrayLike<T4>,
  arr5: ArrayLike<T5>,
  arr6: ArrayLike<T6>,
  arr7: ArrayLike<T7>,
  arr8: ArrayLike<T8>
): [T1, T2, T3, T4, T5, T6, T7, T8][]
export function cartesianProduct(...arrList: ArrayLike<any>[]): any[][]
export function cartesianProduct(...arrList: ArrayLike<any>[]): any[][] {
  // 多重指针法
  // 一次性生成最终结果, 性能更好
  const arrLen = arrList.length
  const pList = Array(arrLen).fill(0)
  const lastIndex = arrLen - 1
  const res: any[][] = []
  // 空集与其他集合的笛卡尔积是空集
  for (let i = 0; i < arrLen; i++) {
    if (!arrList[i].length) return []
  }
  // 计算笛卡尔积
  while (1) {
    const temp: any[] = []
    for (let i = 0; i < arrLen; i++) {
      temp.push(arrList[i][pList[i]])
    }
    res.push(temp)
    // 多重指针 自增 1
    pList[lastIndex] += 1
    for (let i = lastIndex; i >= 0; i--) {
      if (pList[i] >= arrList[i].length) {
        if (i > 0) {
          pList[i] = 0
          pList[i - 1] += 1
        } else break
      } else break
    }
    if (pList[0] >= arrList[0].length) break
  }
  return res
  // 旧版的三重循环法
  // 由于每次循环都要重新生成新的二维数组, 因此效率很低
  // let res: any[][] = []
  // for (let i = 0; i < arrList[0].length; i++) {
  //   res.push([arrList[0][i]])
  // }
  // for (let i = 1; i < arrList.length; i++) {
  //   const newProduct: any[][] = []
  //   const arr = arrList[i]
  //   for (let j = 0; j < arr.length; j++) {
  //     for (let k = 0; k < res.length; k++) {
  //       const record = res[k].slice() // 复制上次循环生成的笛卡尔积
  //       record.push(arr[j])
  //       newProduct.push(record)
  //     }
  //   }
  //   res = newProduct
  // }
  // return res;
}
// 生成函数重载声明的脚本
// with (foreslash) {
//   const gfn = (num) => {
//     const arr = range(1, num, { getter: (n) => 'T' + n })
//     return `export function cartesianProduct<${arr.join(', ')}>(${range(1, num, {
//       getter: (n) => `arr${n}: ArrayLike<T${n}>`,
//     }).join(', ')}): [${arr.join(', ')}][]`
//   }
//   const arr = range(1, 8)
//   console.log(arr.map((n) => gfn(n)).join('\n'))
// }
// // 会打印:
// // export function cartesianProduct<T1>(arr1: ArrayLike<T1>): [T1][]
// // export function cartesianProduct<T1, T2>(arr1: ArrayLike<T1>, arr2: ArrayLike<T2>): [T1, T2][]
// // ...
