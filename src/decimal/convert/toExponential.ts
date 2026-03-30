import type ForeNumber from '../decimal'
import type { ForeRoundMode } from '../types'
import { scientificNotation } from '../../number/scientificNotation'

/**
 * 转换为科学计数法字符串
 */
export function toExponentialString(this: ForeNumber, precision?: number, round?: ForeRoundMode): string {
  return scientificNotation(this.toString(), { type: 'exp', precision, round })
}
