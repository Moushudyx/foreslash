import { isNumber } from './is'
import { _throttle, type ThrottleOptions } from './utils/_throttle'
/**
 * 将一个高频调用的函数处理为防抖函数, 一段时间内多次调用会合并为一次
 * - 比如说 `delay` 设置为 120, 那么方法在 120ms 内多次触发, 也只会在第一次触发的 120ms 后执行一次
 * @param fn 需要防抖的函数
 * @param delay 防抖时间间隔, 单位毫秒, 建议 100 以上
 * @param options 防抖函数的配置, 默认值为 `{ trailing: true, leading: false }`
 * @returns 一个防抖处理的函数, 你可以使用其上的 `reset` 方法重置节流函数内部状态(会停止计划中的函数执行)
 * @version 0.2.2
 */
export function debounce<T extends any[]>(fn: (...args: T) => any, delay: number, options?: ThrottleOptions) {
  if (!isNumber(delay) || !isFinite(delay) || delay <= 0) {
    throw new Error('Invalid delay parameter')
  }
  return _throttle(fn, delay, Object.assign({ trailing: true, leading: false }, options))
}
