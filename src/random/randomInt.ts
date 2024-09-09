/**
 * 生成指定范围内的随机整数
 * @param min 随机数的下界，包含于此范围内
 * @param max 随机数的上界，包含于此范围内
 * @returns 返回一个在`[min, max]`范围内的随机整数
 * @example
 * ```js
 * randomInt(1, 10) // 1 <= x <= 10
 * ```
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
/**
 * 生成指定范围内的随机整数，**不含上界**
 * @param min 随机数的下界，包含于此范围内
 * @param max 随机数的上界，**不包含**于此范围内
 * @returns 返回一个在`[min, max)`范围内的随机整数
 * @example
 * ```js
 * randomInt(1, 10) // 1 <= x <= 9
 * ```
 */
export function randomIntFloor(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}
