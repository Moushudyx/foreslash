---
prev:
  text: 'sleep 休眠'
  link: './sleep'
next:
  text: 'withResolvers ES2024 的 Ponyfill'
  link: './withResolvers'
---

# tryit

<VersionTag version="0.2.0" />

将一个函数处理为“错误优先”(error-first)的函数, 支持同步函数和异步函数

## 基本用法

直接传入需要处理的函数即可, 返回处理过的函数

- 处理过的函数接受的参数与原函数一致
- 调用后返回一个“错误优先”(error-first)的元组 `[error, result]`
  - 如果原函数是异步函数, 则返回值会是 `Promise<[error, result]>`
- 运行正常则 `result` 是原函数的返回值, `error` 为 `undefined`
- 出现异常则 `result` 为 `undefined`, `error` 是原函数抛出的错误

```js
// 同步函数
const normalFn = () => { return 1 }
const errorFn = () => { throw new Error('1') }
tryit(normalFn)() // [undefined, 1]
tryit(errorFn)() // [Error('1'), undefined]

// 异步函数
const normalAsyncFn = () => { return Promise.resolve(1) }
const errorAsyncFn = () => { return Promise.reject('1') }
tryit(normalAsyncFn)() // Promise<[undefined, 1]>
tryit(errorAsyncFn)() // Promise<[Error('1'), undefined]>
```
