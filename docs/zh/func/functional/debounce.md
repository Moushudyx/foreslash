---
prev:
  text: 'curry 柯里化'
  link: './curry'
next:
  text: 'throttle 节流'
  link: './throttle'
---

# debounce

将一个高频调用的函数处理为防抖函数, 一段时间内多次调用会合并为一次

- 与 [throttle 节流](./throttle)类似, 区别在于节流会在第一次触发时调用

## 基本用法

```js {6,8,16}
// 假设这里是一个高频调用的函数
function costlyFn(x) {
  // 一些很耗时的计算, 比如页面检查之类的
  console.log(x)
}
const debounced = debounce(costlyFn, 1000)

debounced(1) // 这一步会塞进队列
await sleep(200)
debounced(2) // 不会执行
await sleep(200)
debounced(3) // 不会执行
await sleep(200)
debounced(4) // 不会执行
await sleep(200)
// 执行队列中的函数, 控制台打印 1
```

## 高级用法

第三个参数是一个配置对象, 可以配置节流类型

- `leading` 是否在第一次调用时立即执行, 默认为 `false`
- `trailing` 节流时触发的最后一次调用是否执行, 默认为 `true`

```js {6,8,10}
// 假设这里是一个高频调用的函数
function costlyFn(x) {
  // 一些很耗时的计算, 比如页面检查之类的
  console.log(x)
}
const debounced = debounce(costlyFn, 1000, { leading: true })

debounced(1) // 由于 leading = true , 这里直接执行, 控制台打印 1
await sleep(200)
debounced(2) // 这一步会塞进队列
await sleep(200)
debounced(3) // 不会执行
await sleep(200)
debounced(4) // 不会执行
await sleep(200)
// 执行队列中的函数, 控制台打印 2
```

返回的防抖函数上有一个 `reset` 方法, 可以用于重置防抖函数

- `reset` 方法会清空队列, 并且重置上次触发的时间

```js {8,10,14,18,20}
function costlyFn(x) {
  console.log(x)
}
const debounced = debounce(costlyFn, 1000)

debounced(1) // 这一步会塞进队列
await sleep(200)
debounced.reset() // 这一步会清空队列
await sleep(800)
// 这里并不会打印 1 因为队列已经被清空了

debounced(2) // 这一步会塞进队列
await sleep(200)
debounced.reset() // 这一步会清空队列
await sleep(200)
debounced(3) // 由于重置上次触发的时间, 这一步也会塞进队列
await sleep(600)
// 这里并不会打印 2 因为打印 2 的队列已经被清空了
await sleep(400)
// 执行队列中的函数, 控制台打印 3
```

特别说明, `debounce` 与 `throttle` 方法其实是同一个方法, 仅仅是默认参数不同, 具体实现可以[查看源码](https://github.com/moushudyx/foreslash/blob/master/src/debounce.ts)
