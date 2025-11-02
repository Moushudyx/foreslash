// const MIN_THRESHOLD = Number.MIN_VALUE * 2
/**
 * 一个广泛使用的[伪随机数生成算法(PRD)](https://github.com/Moushudyx/pseudo-random-distribution)\
 * 返回一个方法, 输出为布尔型, 可以生成一个比正常随机序列分布更加均匀的伪随机数列\
 * 可以极大地避免罕见牌型出现, 缺点是初始概率很低(即第一次命中的概率远远小于输入的 `p`)\
 * 建议在投入使用之前, 先调用 `ceil(1 / p)` 次作为初始化\
 * 此外需要注意的是, 这个算法的最终的精度并不是完全等于输入的 `p` 值
 * @param p 整体概率值, 即概率的数学期望
 * @param options 相关配置
 * - `threshold` 精度, 数值越小, 精度越高, 序列越接近目标 `p` 值, 默认为 `5e-6`
 * @returns 一个方法, 按给定的概率值返回 `true` 和 `false`
 * @example
 * ```js
 * const p0_5 = pipe(randomDistribution(0.5), Number)
 * p0_5() // 0, 1, 0, 0, 1, 1 ...
 * ```
 * @version 0.3.3
 */
export function randomDistribution(p: number, options?: { threshold: number }) {
  const threshold = options?.threshold ? Math.max(options.threshold, Number.MIN_VALUE * 2) : 5e-6
  const C = getInitP(p, threshold)
  let current = C
  /** 生成一个分布均匀的伪随机数列，缺点是初始概率非常低 */
  return function getRandomDistribution() {
    const res = Math.random() < current
    if (res) current = C
    else current += C
    return res
  }
}
/**
 * 内部方法, 用于实现 `randomDistribution` 中的 PRD 算法部分, 根据目标概率, 给出一个初始概率
 * @param targetP 目标概率
 * @param threshold 精度, 数值越小, 精度越高
 * @returns PRD 算法需要的初始概率
 * @version 0.3.3
 */
export function getInitP(targetP: number, threshold = 5e-6) {
  if (targetP <= 0) return 0
  if (targetP >= 1) return 1
  // 硬编码一个中间值用于降低计算量
  // if (p === 2 / 3) return 0.5;
  // let [down, up] = p < 2 / 3 ? [0, 0.5] : [0.5, 1]
  let [down, up] = [0, 1]
  let mid = 1
  let tempP = 1
  let tempPLast = 1
  let step = 64
  while (step-- > 0) {
    mid = (down + up) / 2
    tempP = getRealPFromInitP(mid)
    if (Math.abs(tempPLast - tempP) < threshold) break
    if (tempP > targetP) up = mid
    else down = mid
  }
  return mid
}
/** 检测这个 C 值实际对应的概率 */
function getRealPFromInitP(initP: number) {
  let sum = 0 // 为了方便计算，这里的 sum 是最终数值的倒数
  let prod = 0 // 这里存的是已经计算过的命中比例
  let cur = 0 // 当前比例
  let max = Math.ceil(1 / initP)
  for (let n = 1; n <= max; n++) {
    cur = Math.min(1, n * initP) * (1 - prod)
    prod += cur
    sum += n * cur
  }
  return 1 / sum
}
