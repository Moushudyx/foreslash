---
prev:
  text: 'randomInt 随机数字'
  link: './randomInt'
next:
  text: 'randomString 随机字符串'
  link: './randomString'
---

# randomize

混淆 `Math.random` 使之难以预测, 但会**严重**影响性能

> 理论上仍然存在被预测的可能性, 如果想要真随机数, 请使用 Crypto API(Web 环境)或 `crypto` 模块(Node.js 环境)

## 基本用法

调用 `randomize()` 后, `Math.random` 会被替换为一个不可预测的版本, 但是性能会大幅下降(单次调用耗时增长至 2 ~ 5 倍)

```js
const recoverRandomize = randomize()
Math.random() // 0.12345678... (几乎不可预测)
recoverRandomize() // 恢复原始 Math.random
```
