import type ForeNumber from '../decimal'

/**
 * 预留：支持小数的任意进制转换
 *
 * 设计说明(不依靠 bigint)：
 * 1. 整数部分：使用 limb 级长除法持续除以 radix，记录余数
 * 2. 小数部分：使用 limb 级长乘法持续乘以 radix，取整后继续
 * 3. 通过 precision 截断并按上下文 rounding 做修约，避免无限循环
 * @status placeholder
 */
export function toBase(this: ForeNumber, radix: 2 | 8 | 16, precision = 32): string {
  if (this._k !== 'normal') return this.toString()
  if (precision < 0 || !Number.isFinite(precision)) {
    throw new Error('[ForeNumber] precision 必须是非负有限数')
  }

  throw new Error(`[ForeNumber] toBase(${radix}) 尚未实现；已预留支持小数的算法接口`)
}
