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

// 推荐写法
const tryNormalFn = tryit(normalFn)
const [err, res] = tryNormalFn()
if (err) { /* 错误处理逻辑 */ }
/* 后续逻辑 */

// 异步函数
const normalAsyncFn = () => { return Promise.resolve(1) }
const errorAsyncFn = () => { return Promise.reject('1') }
tryit(normalAsyncFn)() // Promise<[undefined, 1]>
tryit(errorAsyncFn)() // Promise<[Error('1'), undefined]>

// 推荐写法
const tryNormalAsyncFn = tryit(normalAsyncFn)
const [err, res] = await tryNormalAsyncFn()
if (err) { /* 错误处理逻辑 */ }
/* 后续逻辑 */
```

## 类型提示

会根据传入的函数给出不同的输出提示

```js
// 同步函数
const normalFn = (num: number) => { return num + 1 }
tryit(normalFn)
// 结果是 (num: number) => TryitResult<number, Error>
// 展开为 (num: number) => [undefined, number] | [Error, undefined]

// 异步函数
const normalAsyncFn = (num: number) => { return Promise.resolve(num + 1) }
tryit(normalAsyncFn)
// 结果是 (num: number) => Promise<TryitResult<number, Error>>
// 展开为 (num: number) => Promise<[undefined, number] | [Error, undefined]>
```
