---
prev:
  text: 'throttle 节流'
  link: './throttle'
next:
  text: 'deprecate 废弃标记'
  link: './deprecate'
---

# memo

<VersionTag version="0.2.1" />

将一个函数记忆化, 记忆化的函数会缓存执行结果, 避免重复计算

## 基本用法

`memo` 接受两个参数, 第一个参数为函数, 第二个参数为可选的缓存选项, 大多数情况下不需要配置缓存选项

```js
let count = 0 // 记录函数执行次数
const fib = memo(function (n) {
  count++
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
})

fib(10) // count = 11 (计算了 11 次, 因为 n 值为 10 ~ 0)
fib(10) // count = 11 (命中缓存)
```

## 复杂场景下的用法

`memo` 的第二个参数为缓存选项, 具体参数如下:

- `getKey` 自定义 key 的生成规则, 默认使用内部方法生成 key
- `ttl` 缓存的过期时间, 单位毫秒, 默认为 0 表示不过期
- `count` 缓存最大使用次数, 默认为 0 表示不限次数

```js
// 由于 JavaScript 的计时器客观存在误差, 因此 sleep 可能会出现误差
// 这个示例将时间尺度拉长至秒级以规避此类问题
let count = 0 // 记录函数执行次数
const fib = memo(function (n) {
  count++
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}, { ttl: 1000 })

fib(10) // count = 11 (计算了 11 次, 因为 n 值为 10 ~ 0)
fib(10) // count = 11 (命中缓存)
await sleep(1500)
fib(10) // count = 22 (因为之前的计算结果过期, 重新计算了一轮)
fib(10) // count = 22 (命中缓存)
```

```js
let count = 0 // 记录函数执行次数
const memoFn = memo(function (n) {
  count++
  return n;
}, { count: 2 })

memoFn(10) // count = 1 (首次运算)
memoFn(10) // count = 1 (命中缓存)
memoFn(10) // count = 1 (命中缓存)
memoFn(10) // count = 2 (缓存使用次数超过 2, 重新计算了一轮)
```
