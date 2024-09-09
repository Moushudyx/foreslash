/**
 * 不做任何操作，返回`void`，一般用于函数式编程
 * @example
 * ```js
 * // 可以用作默认配置
 * const defaultConfig = { handler: noop }
 * // defaultConfig.handler = xxx
 * ```
 */
export const noop: (...args: any[]) => void = /*#__PURE__*/ function noop() {}

/**
 * 不做任何操作，返回第一个参数，一般用于函数式编程
 * @param value 任意值
 * @returns 传入的第一个值
 * @example
 * ```js
 * // 这里的 pass 不会做任何事
 * const pipeWithPass = pipe(...otherFunctions , pass)
 * ```
 */
export function pass<T>(value: T, ...args: any[]): T
export function pass<T>(...args: T[]): T
export function pass(): undefined
export function pass<T>(value?: T): T | undefined {
  return value
}
/**
 * 接受副作用函数，返回一个带有副作用的函数，一般用于函数式编程
 * @param fn 副作用函数，注意此函数返回值会被忽略
 * @returns 相当于函数式编程中的`pass`，但是会调用副作用函数
 * @example
 * ```js
 * // 这里的 passWithLog 会产生一个打印到控制台的副作用
 * const passWithLog = passWith(console.log)
 * const pipeWithLog = pipe(...otherFunctions , passWithLog)
 * ```
 */
export function passWith<T>(fn: (arg: T) => any): (arg: T) => T {
  return (arg) => {
    fn(arg)
    return arg
  }
}
