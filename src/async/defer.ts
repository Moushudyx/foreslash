import { isFunction, isInteger } from '../is'
import { tryit } from './tryit'

type DeferCallbackFunction = (error?: Error) => unknown
type DeferOption = { rethrow: boolean }
/**
 * 在传入的函数执行完毕后(或是抛出异常后), 执行*延迟操作*\
 * 使用场景一般是处理“副作用”, 类似 `try {} finally {}` 结构但是更加灵活
 * - 执行*延迟操作*的时机是函数执行完毕后(或是抛出异常后), 同时 `defer` 返回的 `Promise` 并未结束
 *   - 这个设计是防止*延迟操作*与后续逻辑产生干扰
 * - `defer` 返回的 `Promise` 会根据传入的函数是否正常处理/抛出异常而变化
 *   - 传入的函数正常处理, 结果为 `1`, 那么 `defer` 将返回 `Promise {<fulfilled>: 1}`
 *   - 传入的函数抛出异常, 内容为 `2`, 那么 `defer` 将返回 `Promise {<rejected>: 2}`
 *
 * *延迟操作*时抛出的错误不会正常抛出
 * - 如果希望执行*延迟操作*时正常抛错, 您可以配置 `options.rethrow = true`
 * @param asyncFunction 需要在执行完毕后做额外处理函数
 * @param options.rethrow 执行*延迟操作*时是否正常抛错, 默认不抛错
 * @returns 一个 `Promise` 会根据传入的函数是否正常处理/抛出异常而变化
 * @example
 * ```js
 * // 一般用途
 * defer((cleanUp) => {
 *   cleanUp(() => console.log(2))
 *   cleanUp(() => console.log(3))
 *   console.log(1)
 * }) // 依次输出 1 2 3
 * // 可以动态取消计划好的延迟操作
 * defer((cleanUp, cancelCleanUp) => {
 *   const cleanUpId = cleanUp(() => console.log(123)) // 会返回一个数字作为 id
 *   cleanUp(() => console.log(5))
 *   cleanUp(() => console.log(6))
 *   console.log(4)
 *   cancelCleanUp(cleanUpId) // 可以用于取消指定的延迟操作
 * }) // 依次输出 4 5 6
 * ```
 * @version 0.2.3
 */
export async function defer<T>(
  asyncFunction: (
    cleanUp: (fn: DeferCallbackFunction) => number,
    cancelCleanUp: (fnOrIndex: DeferCallbackFunction | number) => void
  ) => T | Promise<T>,
  options?: Partial<DeferOption>
): Promise<T> {
  const queue: Array<{ fn: DeferCallbackFunction; opt: DeferOption } | null> = []
  const { rethrow = false } = options || {}
  const defaultOption = { rethrow }
  const cleanUp = (fn: DeferCallbackFunction, options?: Partial<DeferOption>) => {
    queue.push({ fn, opt: Object.assign(defaultOption, options) })
    return queue.length - 1
  }
  const cancelCleanUp = (fnOrIndex: DeferCallbackFunction | number) => {
    if (isInteger(fnOrIndex) && fnOrIndex > -1) queue[fnOrIndex] = null
    else if (isFunction(fnOrIndex)) {
      const i = queue.findIndex((item) => item && item.fn === fnOrIndex)
      if (i > -1) queue[i] = null
    }
  }
  const [err, res] = await tryit(asyncFunction)(cleanUp, cancelCleanUp)
  for (const item of queue) {
    if (!item) continue
    const { fn, opt } = item
    const [cleanUpErr] = await tryit(fn)(err)
    if (cleanUpErr && opt.rethrow) throw cleanUpErr
  }
  if (err) throw err
  return res as T
}
