/**
 * 获取全局对象，浏览器环境返回 `window`，node 环境返回 `global`
 * @returns 全局对象
 */
export function getGlobalThis(): typeof globalThis {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  return Function('return this')()
}
