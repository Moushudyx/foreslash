---
prev:
  text: 'defer 延后'
  link: './defer'
next:
  text: 'retry 重试'
  link: './retry'
---

# parallel

并发执行函数, 可以控制并发数量, 当并发数达到最大时, 会等待前面的函数执行完毕后再执行后面的函数, 直到所有函数执行完毕, 才会返回结果。

## 基本用法

接受三个参数, 第一个参数是需要处理的数据数组, 第二个参数是处理函数(可以是同步、异步函数), 第三个参数是相关配置。

- `limit` 并发数量, 默认 `5`

运行后会返回一个 `Promise`, 当所有数据都处理完成后, 会返回一个包含所有结果的数组。

如果有错误, 则会抛出一个 `Error` 对象, `Error.cause` 中包含所有错误信息(如果环境支持的话)。

```js
const fn = async (n) => { return n * 2 }
parallel([1, 2, 3, 4, 5], fn, { limit: 2 }) // Promise<[2, 4, 6, 8, 10]>

// 任意一个函数出错, 则会抛出错误, 详细的错误信息会包含在 Error.cause 中
const errFn = async (n: number) => { throw new Error(`${n}`) }
parallel([1, 2, 3, 4, 5], fn) // Error(`Parallel execution failed on index: 0, 1, 2, 3, 4`)
// 其中 Error.cause 为 [{ index: 0, Error('1') }, { index: 1, Error('2') }, ...]
// 注意: 比较老的环境可能不支持 Error.cause, 此时将获取不到具体错误
```
