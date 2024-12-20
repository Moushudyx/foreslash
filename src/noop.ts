/**
 * 不做任何操作，返回 `void` ，一般用于函数式编程
 * @example
 * ```js
 * // 可以用作默认配置
 * const defaultConfig = { handler: noop }
 * // defaultConfig.handler = xxx
 * ```
 */
export const noop: (...args: any[]) => void = /*#__PURE__*/ function noop() {}
