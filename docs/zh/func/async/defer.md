---
prev: false
next:
  text: 'parallel 并行'
  link: './parallel'
---

# defer

在传入的函数执行完毕后(或是抛出异常后), 执行*延迟操作*。

使用场景一般是处理“副作用”, 类似 `try {} finally {}` 结构但是更加灵活。

- 执行*延迟操作*的时机是函数执行完毕后(或是抛出异常后), 同时 `defer` 返回的 `Promise` 并未结束
  - 这个设计是防止*延迟操作*与后续逻辑产生干扰
- `defer` 返回的 `Promise` 会根据传入的函数是否正常处理/抛出异常而变化
  - 传入的函数正常处理, 结果为 `1`, 那么 `defer` 将返回 `Promise {<fulfilled>: 1}`
  - 传入的函数抛出异常, 内容为 `2`, 那么 `defer` 将返回 `Promise {<rejected>: 2}`

## 基本用法

接受两个参数, 第一个参数是需要在执行完毕后做额外处理函数, 第二个参数是相关配置

- `rethrow` 执行*延迟操作*时是否正常抛错, 默认忽略延迟操作中的抛错

```js
// 一般用途
defer((cleanUp) => {
  cleanUp(() => console.log(2))
  cleanUp(() => console.log(3))
  console.log(1)
  return '一般情况'
})
// 依次输出 1 2 3
// 返回 Promise {<fulfilled>: '一般情况'}

// 可以动态取消计划好的延迟操作
defer((cleanUp, cancelCleanUp) => {
  const cleanUpId = cleanUp(() => console.log(123)) // 会返回一个数字作为 id
  cleanUp(
    async () => {
      await sleep(1000)
      console.log(5)
    }
  )
  cleanUp(() => console.log(6))
  console.log(4)
  cancelCleanUp(cleanUpId) // 可以用于取消指定的延迟操作
  return '取消指定的延迟操作'
})
// 依次输出 4 (延迟一秒) 5 6
// 返回 Promise {<fulfilled>: '取消指定的延迟操作'}

// 即使出现错误也会先执行计划好的延迟操作
defer((cleanUp, cancelCleanUp) => {
  cleanUp(() => console.log(8))
  cleanUp(() => console.log(9))
  console.log(7)
  throw '抛出错误'
})
// 依次输出 7 8 9
// 返回 Promise {<rejected>: '抛出错误'}
```
