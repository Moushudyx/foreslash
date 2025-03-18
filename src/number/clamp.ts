/**
 * 将一个数字限制在指定范围内
 * @param num 初始值
 * @param min 最小值, 没有默认值, 初始值小于最小值或初始值不为数字时返回最小值
 * @param max 最大值, 没有默认值, 初始值大于最大值时返回最大值
 * @param options 配置项, 可以配置默认值等
 * - `default` 默认值, 如果初始值不在范围内, 则返回默认值
 * - `defaultMin` 初始值小于最小值时返回该值, 覆盖 `default` 参数
 * - `defaultMax` 初始值大于最大值时返回该值
 * @returns 返回一个在指定范围内的数字
 * @example
 * ```js
 * clamp(5, 0, 10) // 5
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10, { default: 6 }) // 5
 * clamp(15, 0, 10, { default: 6 }) // 6
 * clamp(-5, 0, 10, { default: 6 }) // 6
 * ```
 */
export function clamp(
  num: number,
  min: number,
  max: number,
  options?: { default?: number; defaultMin?: number; defaultMax?: number }
) {
  if (isNaN(min)) throw new Error('Invalid min parameter')
  if (isNaN(max)) throw new Error('Invalid max parameter')
  if (max < min) {
    ;[min, max] = [max, min]
  }
  const { default: def, defaultMin: _dMin, defaultMax: _dMax } = options || {}
  const defaultMin = _dMin ?? def ?? min
  const defaultMax = _dMax ?? def ?? max
  if (isNaN(num)) return defaultMin // 初始值不为数字时返回最小值
  return num < min ? defaultMin : num > max ? defaultMax : num
}
