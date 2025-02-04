---
prev:
  text: 'retry 重试'
  link: './retry'
next:
  text: 'tryit 错误优先回调'
  link: './tryit'
---

# sleep

返回一个一定时间后自行完成的 `Promise`, 内部实现是 `setTimeout` 因此计时可能不准确

## 基本用法

传入一个数字作为延迟时间, 单位为毫秒(ms), 默认为 `1000` (即 1 秒)

```js
sleep().then(() => {
  // 1 秒后
})
await sleep(2500) // 在这停留 2.5 秒
```
