import type {
  PipeFuncList1,
  PipeFuncList2,
  PipeFuncList3,
  PipeFuncList4,
  PipeFuncList5,
  PipeFuncList6,
  PipeFuncList7,
  PipeFuncList8,
  PipeFuncListMore,
} from './utils/_pipe'

/**
 * 函数管道，将多个函数组合成一个函数，依次执行并返回结果
 * @param pipeFunc 需要组合的函数列表，从左到右依次执行，返回值将作为下一个函数的参数
 * @returns 返回一个函数，接受参数，依次执行函数列表，并返回最后一个函数的返回值
 * @example
 * ```js
 * const pipedFn = pipe(fn1, fn2, fn3)
 * pipedFn(...args)
 * // 等价于 fn3(fn2(fn1(...args)))
 * ```
 */
export function pipe<PipeArgs extends any[], PipeResult>(
  ...pipeFunc: PipeFuncList1<PipeArgs, PipeResult>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1>(
  ...pipeFunc: PipeFuncList2<PipeArgs, PipeResult, Mid1>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1, Mid2>(
  ...pipeFunc: PipeFuncList3<PipeArgs, PipeResult, Mid1, Mid2>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1, Mid2, Mid3>(
  ...pipeFunc: PipeFuncList4<PipeArgs, PipeResult, Mid1, Mid2, Mid3>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1, Mid2, Mid3, Mid4>(
  ...pipeFunc: PipeFuncList5<PipeArgs, PipeResult, Mid1, Mid2, Mid3, Mid4>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5>(
  ...pipeFunc: PipeFuncList6<PipeArgs, PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6>(
  ...pipeFunc: PipeFuncList7<PipeArgs, PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>(
  ...pipeFunc: PipeFuncList8<PipeArgs, PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>(
  ...pipeFunc: PipeFuncListMore<PipeArgs, PipeResult, Mid1, Mid2, Mid3, Mid4, Mid5, Mid6, Mid7>
): (...args: PipeArgs) => PipeResult
export function pipe<PipeArgs extends any[], PipeResult>(...pipeFunc: any[]) {
  // 参数校验
  if (pipeFunc.length === 0) {
    throw new Error('Invalid pipeFunc parameter: pipeFunc is empty')
  }
  for (let i = 0; i < pipeFunc.length; i++) {
    if (typeof pipeFunc[i] !== 'function') {
      throw new Error(`Invalid pipeFunc parameter: pipeFunc[${i}] is not a function`)
    }
  }
  // 函数组合
  return (...args: PipeArgs) => {
    let result = pipeFunc[0](...args) // 首次执行需要展开参数
    for (let i = 1; i < pipeFunc.length; i++) {
      result = pipeFunc[i](result)
    }
    return result as PipeResult
  }
}
