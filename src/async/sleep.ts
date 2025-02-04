/**
 * 延迟一定时间
 * @param time 延迟时间, 单位为毫秒(ms), 默认为 `1000` (即 1 秒)
 * @returns 一个 `Promise`, 到指定时间后会变为 `fulfilled` 状态
 * @example
 * ```js
 * sleep().then(() => {
 *   // do something 1s later
 * })
 *
 * await sleep(2500) // do something 2.5s later
 * ```
 */
export function sleep(time: number = 1000) {
  return new Promise((res) => {
    setTimeout(res, time)
  })
}
