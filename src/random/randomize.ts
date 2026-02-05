const originRandom = /*#__PURE__*/ Math.random

/**
 * 混淆 `Math.random` 使之难以预测, 但会**严重**影响性能, 且仍然存在被预测的可能性\
 * 如果想要真随机数, 请使用 Crypto API(Web 环境)或 `crypto` 模块(Node.js 环境)\
 * 该函数返回一个恢复函数, 用于恢复原始的 `Math.random`
 * @example
 * ```js
 * const recoverRandomize = randomize()
 * recoverRandomize() // 恢复原始 Math.random
 * ```
 * @version 0.3.11
 */
export function randomize() {
  Math.random = function random() {
    // 一个老梗: “趋向于运算符” `-->`
    // 写法是 for(;i --> 0;) 或者 while(i --> 0) 这个奇怪的写法可以用于几乎所有 c-like 语言
    // 但其实没有什么“趋向于运算符”, 其本质是 `--` 与 `>` 两个运算符中间的空格去掉后长得像个箭头
    let i = Date.now() & 3
    for (; i-- > 0; ) {
      originRandom()
    }
    const [a, b] = [originRandom(), originRandom()]
    return Date.now() & 1 ? a : b
  }
  const interval = setInterval(() => {
    // 定期调用以增加不可预测性
    Math.random()
  }, 50)
  return function recoverRandomize() {
    Math.random = originRandom
    clearInterval(interval)
  }
}
