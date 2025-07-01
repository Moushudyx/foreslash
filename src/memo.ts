import { isBigInt, isDate, isRegExp } from './is'

/** 内部方法 将参数转换为字符串作为 key */
function _getKey(args: any[]) {
  function toString(item: any) {
    if (isBigInt(item)) return String(item) + 'n'
    if (isRegExp(item)) return 'RegExp' + String(item)
    if (isDate(item)) return 'Date' + item.toISOString()
    try {
      return JSON.stringify(item) // 默认情况下使用 JSON.stringify 的结果作为 key
    } catch (e) {
      return String(item)
    }
  }
  let res = 'ForeSlashMemoKey:['
  for (let i = 0; i < args.length; i++) {
    res += toString(args[i]) + ','
  }
  return res + ']'
}
/**
 * 将一个函数记忆化, 多次调用如果参数相同, 则直接返回缓存的结果, 而不会反复执行函数
 * - 每次运行时会将当前参数处理为 `key`, 相同 `key` 的函数调用将返回相同的结果
 * @param fn 要缓存的函数
 * @param options 缓存选项
 * - `getKey` 自定义 key 的生成规则, 默认使用内部方法生成 key
 * - `ttl` 缓存的过期时间, 单位毫秒, 为 0 表示不过期, 默认不过期
 * - `count` 缓存最大使用次数, 为 0 表示不限次数, 默认不限次数
 * @returns 记忆化的函数, 输入相同参数再次调用时会直接返回之前的结果而不会调用原函数
 * @example
 * ```js
 * // 计算斐波那契数列
 * const fib = memo(function (n) {
 *   if (n < 2) return n
 *   return fib(n - 1) + fib(n - 2)
 * })
 * ```
 */
export function memo<TArgs extends any[], TRes>(
  fn: (...args: TArgs) => TRes,
  options?: {
    getKey?: (...args: TArgs) => string | number
    ttl?: number
    count?: number
  }
) {
  /** 内部缓存 */
  const map = new Map<string | number, { res: TRes; ttl: number; count: number }>()
  const getKey = options?.getKey ? options.getKey : _getKey
  const setTtl = options?.ttl ? options.ttl : 0
  const setCount = options?.count ? options.count : 0
  return function (this: any, ...args: TArgs): TRes {
    const key = getKey(args)
    if (map.has(key)) {
      const item = map.get(key)!
      const { res, ttl, count } = item
      const isValidCache = ttl >= Date.now() && count > 0
      // 处理使用次数
      item.count -= 1
      if (item.count <= 0) map.delete(key)
      // 处理过期时间
      if (ttl < Date.now()) map.delete(key)
      // 处理完毕
      if (isValidCache) return res
    }
    const res = fn.apply(this, args)
    const memoItem = { res, ttl: Infinity, count: Infinity }
    // 设置使用次数
    if (setCount > 0) memoItem.count = setCount
    // 设置过期时间
    if (setTtl > 0) memoItem.ttl = Date.now() + setTtl
    map.set(key, memoItem)
    return res
  }
}
