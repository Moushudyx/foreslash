const originRandom = /*#__PURE__*/ Math.random

/**
 * 随机化 `Math.random` 使之难以预测, 但会**严重**影响性能
 * @example
 * ```js
 * const recoverRandomize = randomize()
 * recoverRandomize()
 * ```
 */
export function randomize() {
  Math.random = function random() {
    for (let i = Date.now() % 3; i-- > 0; ) {
      originRandom()
    }
    return originRandom()
  }
  return function recoverRandomize() {
    Math.random = originRandom
  }
}
