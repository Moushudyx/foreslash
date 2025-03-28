export interface ThrottleOptions {
  /** 节流时触发的最后一次调用是否执行, 默认为否 */
  trailing?: boolean
  /** 触发的最后一次调用是否使用最后一次的参数, 默认为是 */
  trailingRunLast?: boolean
  /** 第一次触发是否直接执行, 默认为是 */
  leading?: boolean
}

/** */
export function _throttle<T extends any[]>(fn: (...args: T) => any, delay: number, options?: ThrottleOptions) {
  const trailing = options?.trailing ?? false
  const trailingRunLast = options?.trailingRunLast ?? true
  const leading = options?.leading ?? true
  let timer: null | ReturnType<typeof setTimeout> = null
  let lastTime = 0
  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
  const reset = () => {
    clearTimer()
    lastTime = 0
  }
  return Object.assign(
    function (this: any, ...args: T) {
      const now = Date.now()
      /** 大于等于 0 表示已经过了 delay 毫秒 */
      const timeGap = now - lastTime - delay
      // timeGap >= 0 表示已经过了节流阈值
      if (timeGap >= 0) {
        lastTime = now
        clearTimer()
      }
      // 如果配置了触发最后一次调用时使用最后一次的参数, 则清除定时器重新生成一个
      if (timeGap < 0 && trailing && trailingRunLast && timer) {
        clearTimer()
      }
      if (timeGap >= 0 && leading) {
        // 第一次触发直接执行
        fn.apply(this, args)
      } else if (timeGap >= 0 || (timeGap < 0 && trailing && !timer)) {
        // 节流时触发的最后一次调用
        timer = setTimeout(
          () => {
            lastTime = Date.now()
            timer = null
            fn.apply(this, args)
          },
          // timeGap >= 0 不执行第一次触发
          // timeGap < 0 执行节流时触发的最后一次调用
          timeGap >= 0 ? delay : -timeGap
        )
      }
      // if (timeGap >= 0) {
      //   lastTime = now
      //   clearTimer()
      //   if (leading) {
      //     fn.apply(this, args)
      //   } else {
      //     timer = setTimeout(() => {
      //       lastTime = Date.now()
      //       timer = null
      //       fn.apply(this, args)
      //     }, delay)
      //   }
      // } else if (trailing) {
      //   if (!timer) {
      //     timer = setTimeout(() => {
      //       lastTime = Date.now()
      //       timer = null
      //       fn.apply(this, args)
      //     }, -timeGap)
      //   }
      // }
    },
    { reset }
  )
}
