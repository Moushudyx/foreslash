import { isNumber } from './is'
import { _throttle, type ThrottleOptions } from './utils/_throttle'
/**
 * 将一个高频调用的函数处理为节流函数, 一段时间内只会调用一次
 * - 比如说 `delay` 设置为 120, 那么方法在第一次触发后执行, 随后的 120ms 内多次触发也不会再执行
 * @param fn 需要节流的函数
 * @param delay 节流时间间隔, 单位毫秒, 建议 100 以上
 * @param options 节流函数的配置, 默认值为 `{ trailing: false, leading: true }`
 * @returns 一个节流处理的函数, 你可以使用其上的 `reset` 方法重置节流函数内部状态(会停止计划中的函数执行)
 * @version 0.2.2
 */
export function throttle<T extends any[]>(fn: (...args: T) => any, delay: number, options?: ThrottleOptions) {
  if (!isNumber(delay) || !isFinite(delay) || delay <= 0) {
    throw new Error('Invalid delay parameter')
  }
  return _throttle(fn, delay, Object.assign({ trailing: false, leading: true }, options))
}
