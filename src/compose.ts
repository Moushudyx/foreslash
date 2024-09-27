import type {
  ComposeFuncList1,
  ComposeFuncList2,
  ComposeFuncList3,
  ComposeFuncList4,
  ComposeFuncList5,
  ComposeFuncList6,
  ComposeFuncList7,
  ComposeFuncList8,
  ComposeFuncListMore,
} from './utils/_compose'

/**
 * 函数组合，将多个函数组合成一个函数，逆序执行并返回结果
 * - 与 `pipe` 类似，但是执行顺序为从右到左
 * @param composeFunc 需要组合的函数列表，从右到左依次执行，返回值将作为下一个函数的参数
 * @returns 返回一个函数，接受参数，逆序执行函数列表，并返回最后一个函数的返回值
 * @example
 * ```js
 * const composedFn = compose(fn1, fn2, fn3)
 * composedFn(...args)
 * // 等价于 fn1(fn2(fn3(...args)))
 * ```
 */
export function compose<CompArgs extends any[], CompResult>(
  ...composeFunc: ComposeFuncList1<CompArgs, CompResult>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1>(
  ...composeFunc: ComposeFuncList2<CompArgs, CompResult, Mid1>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1, Mid2>(
  ...composeFunc: ComposeFuncList3<CompArgs, CompResult, Mid1, Mid2>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1, Mid2, Mid3>(
  ...composeFunc: ComposeFuncList4<CompArgs, CompResult, Mid1, Mid2, Mid3>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1, Mid2, Mid3, Mid4>(
  ...composeFunc: ComposeFuncList5<CompArgs, CompResult, Mid1, Mid2, Mid3, Mid4>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1, Mid2, Mid3, Mid4, Mid5>(
  ...composeFunc: ComposeFuncList6<CompArgs, CompResult, Mid1, Mid2, Mid3, Mid4, Mid5>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6>(
  ...composeFunc: ComposeFuncList7<CompArgs, CompResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>(
  ...composeFunc: ComposeFuncList8<CompArgs, CompResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>(
  ...composeFunc: ComposeFuncListMore<CompArgs, CompResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>
): (...args: CompArgs) => CompResult
export function compose<CompArgs extends any[], CompResult>(...composeFunc: any[]) {
  // 参数校验
  if (composeFunc.length === 0) {
    throw new Error('Invalid composeFunc parameter: composeFunc is empty')
  }
  for (let i = 0; i < composeFunc.length; i++) {
    if (typeof composeFunc[i] !== 'function') {
      throw new Error(`Invalid composeFunc parameter: composeFunc[${i}] is not a function`)
    }
  }
  const _fnList = composeFunc.slice().reverse() // 函数组合
  return (...args: CompArgs) => {
    let result = _fnList[0](...args) // 首次执行需要展开参数
    for (let i = 1; i < _fnList.length; i++) {
      result = _fnList[i](result)
    }
    return result as CompResult
  }
}
