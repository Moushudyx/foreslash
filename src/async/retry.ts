import { isFunction, isNumber } from '../is'
import { sleep } from './sleep'
import { tryit } from './tryit'

type RetryFunction<T> = (() => T | Promise<T>) | ((exitCallback: (err: any) => never) => T | Promise<T>)
type RetryOption = {
  times?: number
  delay?: number | ((retryCounts: number) => number)
  gap?: number | ((retryCounts: number) => number)
  // signal?: AbortSignal // Radashi 的这个感觉不错，但是会让代码变得复杂
}
/**
 * 在传入的函数发生异常后重试\
 * 使用场景一般是重试网络请求等情况
 * - 可以设置两次重试之间的延迟(delay), 默认为无延迟
 * - 也可以设置为两次重试之间的时间间隔(gap), 与延迟模式的区别见下文
 * - 传入的函数接受一个 `exit` 回调函数, 调用这个回调函数会立即退出重试逻辑
 *
 * 延迟模式(delay)
 * ``` text
 * delay = 1000:
 * |0s                  |1s                  |2s                  |3s
 * |[400ms-]            |        [800ms------|---]                |    [第 3 次调用]
 *         ^ 1000ms ++++|+++++++ ^               ^ 1000ms ++++++++|+++ ^
 * ```
 *
 * 间隔模式(gap)
 * ``` text
 * gap = 1000:
 * |0s                  |1s                  |2s
 * |[400ms-]            |[800ms---------]    |[第 3 次调用]
 * ^ 1000ms +++++++++++ ^ 1000ms +++++++++++ ^
 * ```
 *
 * @param asyncFunction 需要处理的函数, 推荐是异步函数, 也可以是同步函数
 * @param option 重试相关的配置, 具体配置见下
 * @example
 * ```js
 * // 基本用法, 默认重试 3 次, 每次失败后会立即重新调用
 * const res = await retry(() => fetch(url, params))
 * // 重试 10 次
 * const res = await retry(() => fetch(url, params), { times: 10 })
 * // 延迟模式, 每次失败后会等待 1 秒再重新调用
 * const res = await retry(() => fetch(url, params), { delay: 1000 })
 * // 间隔模式, 每次失败后会在下 1 秒再重新调用
 * const res = await retry(() => fetch(url, params), { gap: 1000 })
 * ```
 * @version 0.2.4
 */
export async function retry<T>(asyncFunction: RetryFunction<T>, option?: RetryOption): Promise<T> {
  let retryCounts = 0
  const times = isNumber(option?.times) ? option.times : 3
  const delay = isFunction(option?.delay)
    ? option.delay
    : isNumber(option?.delay)
    ? () => option.delay as number
    : null
  const gap = isFunction(option?.gap) ? option.gap : isNumber(option?.gap) ? () => option.gap as number : null
  let lastRunTime: number = 0
  const getDelayTime: (retryCounts: number) => number =
    !option || (!delay && !gap)
      ? () => 0
      : gap
      ? (retryCounts: number) => {
          const time = gap(retryCounts)
          return time - Date.now() + lastRunTime
        }
      : delay!
  while (1) {
    // console.log('retry while')
    lastRunTime = Date.now()
    const [err, res] = await tryit(asyncFunction as (exitCallback: (err: any) => never) => T | Promise<T>)(
      (err: any) => {
        throw { $$exit_retry: err }
      }
    )
    if (!err) return res as T
    retryCounts++
    if (err && (err as Error & { $$exit_retry: any }).$$exit_retry)
      throw (err as Error & { $$exit_retry: any }).$$exit_retry
    if (retryCounts >= times) throw err
    const delayTime = getDelayTime(retryCounts)
    if (delayTime > 0) await sleep(delayTime)
  }
  throw new Error('retry failed')
}
