export type RangeOptions<T> = {
  step?: number
  value?: T
  getter?: (index: number, existList: T[]) => T
}
/**
 * 根据起止值生成一个数组, 步长默认为 1
 * @param start 开始值
 * @param end 结束值
 * @example
 * ```js
 * range(1, 10) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * range(10, 1) // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
 * ```
 * @version 0.2.0
 */
export function range(start: number, end: number): number[]
/**
 * 根据起止值生成一个数组, 步长默认为 1
 * @param start 开始值
 * @param end 结束值
 * @param step 步长, 默认为 1
 * @example
 * ```js
 * range(1, 10, 2) // [1, 3, 5, 7, 9]
 * range(10, 0, 2) // [10, 8, 6, 4, 2, 0]
 * ```
 * @version 0.2.0
 */
export function range(start: number, end: number, step?: number): number[]
/**
 * 根据起止值生成一个数组, 步长默认为 1
 * @param start 开始值
 * @param end 结束值
 * @param options 详细配置项, 用法见下
 * @example
 * ```js
 * range(1, 5, { step: 2 }) // [1, 3, 5]
 * range(0, 6, { step: 2 }) // [0, 2, 4, 6]
 * range(0, 6, { step: 2, value: 'test' }) // ['test', 'test', 'test', 'test']
 * range(0, 6, { step: 2, getter: (i) => i * 10 }) // [0, 20, 40, 60]
 * ```
 * @version 0.2.0
 */
export function range<T = number>(start: number, end: number, options?: RangeOptions<T>): T[]
export function range<T = number>(start: number, end: number, stepOrOptions?: number | RangeOptions<T>): T[] {
  let step = 1
  let getter: null | undefined | ((index: number, existList: T[]) => T) = null
  if (typeof stepOrOptions === 'number') {
    step = stepOrOptions
  } else if (stepOrOptions) {
    const { step: _step } = stepOrOptions
    if (_step) step = _step
    if ('value' in stepOrOptions) getter = () => stepOrOptions.value as T
    else if ('getter' in stepOrOptions) getter = stepOrOptions.getter
  }
  if (!isFinite(step)) throw new Error('step must be finite')
  if (step === 0) throw new Error('step must not be 0')
  if (!isFinite(start) || !isFinite(end)) throw new Error('start and end must be finite')
  if ((start > end && step > 0) || (start < end && step < 0)) step = -step
  const res: T[] = []
  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    res.push(getter ? getter(i, res) : (i as T))
    if (step > 0 ? i + step > end : i + step < end) break
  }
  return res
}
