---
prev:
  text: 'debounce 防抖'
  link: './debounce'
next:
  text: 'memo 记忆化'
  link: './memo'
---

# throttle

<VersionTag version="0.2.2" />

将一个高频调用的函数处理为节流函数, 调用一次后一段时间内不再响应

- 与 [debounce 防抖](./debounce)类似, 区别在于防抖会合并多次触发, 并延迟调用

## 基本用法

```js {6,8,16}
// 假设这里是一个高频调用的函数
function costlyFn(x) {
  // 一些很耗时的计算, 比如页面检查之类的
  console.log(x)
}
const throttled = throttle(costlyFn, 1000)

throttled(1) // 直接执行, 控制台打印 1
await sleep(200)
throttled(2) // 不会执行
await sleep(200)
throttled(3) // 不会执行
await sleep(200)
throttled(4) // 不会执行
await sleep(200)
throttled(5) // 过了节流周期, 直接执行, 控制台打印 5
```

## 高级用法

第三个参数是一个配置对象, 可以配置节流类型

- `leading` 是否在第一次调用时立即执行, 默认为 `true`
- `trailing` 节流时触发的最后一次调用是否执行, 默认为 `false`

```js {6,10}
// 假设这里是一个高频调用的函数
function costlyFn(x) {
  // 一些很耗时的计算, 比如页面检查之类的
  console.log(x)
}
const throttled = throttle(costlyFn, 1000, { trailing: true })

throttled(1) // 直接执行, 控制台打印 1
await sleep(200)
throttled(2) // 由于 trailing = true , 这一步会塞进队列
await sleep(200)
throttled(3) // 不会执行
await sleep(200)
throttled(4) // 不会执行
await sleep(200)
// 执行队列中的函数, 控制台打印 2
```

返回的节流函数上有一个 `reset` 方法, 可以用于重置节流函数

- `reset` 方法会重置上次触发的时间, 如果设置了 `trailing: true` 还会清空队列

```js {11,12}
function costlyFn(x) {
  console.log(x)
}
const throttled = throttle(costlyFn, 1000)

throttled(1) // 直接执行, 控制台打印 1
await sleep(200)
throttled(2) // 不会执行
await sleep(200)
throttled(3) // 不会执行
throttled.reset() // 重置节流函数
throttled(4) // 由于重置上次触发的时间, 这里会直接执行, 控制台打印 4
```

特别说明, `throttle` 与 `debounce` 方法其实是同一个方法, 仅仅是默认参数不同, 具体实现可以[查看源码](https://github.com/moushudyx/foreslash/blob/master/src/throttle.ts)
