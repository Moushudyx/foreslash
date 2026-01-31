/**
 * 获取全局对象，浏览器环境返回 `self` 或 `window`, Node.js 环境返回 `global`
 * @returns 全局对象
 */
export const getGlobalThis = (function () {
  let globalThisCache: typeof globalThis | null = null
  return function (): typeof globalThis {
    if (globalThisCache) return globalThisCache
    globalThisCache = _getGlobalThis()
    return globalThisCache
  }
})()
function _getGlobalThis(): typeof globalThis {
  try {
    if (typeof self !== 'undefined') return self
  } catch {
    /* ReferenceError: self is not defined */
  }
  try {
    if (typeof window !== 'undefined') return window
  } catch {
    /* ReferenceError: window is not defined */
  }
  try {
    if (typeof global !== 'undefined') return global
  } catch {
    /* ReferenceError: global is not defined */
  }
  try {
    if (typeof globalThis !== 'undefined') return globalThis
  } catch {
    /* ReferenceError: globalThis is not defined */
  }
  return Function('return this')()
}
