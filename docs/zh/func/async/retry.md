---
prev:
  text: 'parallel 并行'
  link: './parallel'
next:
  text: 'sleep 休眠'
  link: './sleep'
---

# retry

立即执行传入的函数, 并在函数执行出错时重试, 可以指定重试次数、重试时间间隔。

## 基本用法

接受两个参数, 第一个参数是需要重试的函数, 第二个参数是相关配置。

- `times` 重试次数, 默认 `3`
- `delay` 重试延迟, 单位为毫秒, 默认 `0` (即立即重试)
  - 可以设置为一个函数, 函数的参数为当前重试次数, 返回值为延迟时间, 单位为毫秒
- `gap` 重试间隔, 单位为毫秒, 设置此项会覆盖 `delay` 配置, 默认 `0` (即立即重试)
  - 可以设置为一个函数, 函数的参数为当前重试次数, 返回值为间隔时间, 单位为毫秒

```js
// 基本用法, 默认重试 3 次, 每次失败后会立即重新调用
const res = await retry(() => fetch(url, params))
// 重试 10 次
const res = await retry(() => fetch(url, params), { times: 10 })
// 延迟模式, 每次失败后会等待 1 秒再重新调用
const res = await retry(() => fetch(url, params), { delay: 1000 })
/*
|0s                  |1s                  |2s                  |3s
|[400ms-]            |        [800ms------|---]                |    [第 3 次调用]
        ^ 1000ms ++++|+++++++ ^               ^ 1000ms ++++++++|+++ ^
*/
// 间隔模式, 每次失败后会在下 1 秒再重新调用
const res = await retry(() => fetch(url, params), { gap: 1000 })
/*
|0s                  |1s                  |2s
|[400ms-]            |[800ms---------]    |[第 3 次调用]
^ 1000ms +++++++++++ ^ 1000ms +++++++++++ ^
*/
```

## 中断重试

传入的函数可以接受一个 `exitCallback` 方法, 用于中断重试。

```js
// 中断重试
const res = await retry(
  (exitCallback) => {
    fetch(url, params).then((res) => {
      if (res.status === 404) {
        exitCallback(/* 这里可以传 Error 对象 */) // 中断重试
      }
    })
  },
  { times: 10 }
)
```
