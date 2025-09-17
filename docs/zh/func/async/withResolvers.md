---
prev:
  text: 'tryit 错误优先回调'
  link: './tryit'
next: false
---

# withResolvers

<VersionTag version="0.2.0" />

此方法实现了 ES2024(ES15) 引入 `Promise.withResolvers` 的 ponyfill

## 基本用法

以下例子展示了如何利用 `withResolvers` 将一个回调函数模式的交互逻辑更改为异步

```js
// 由于历史原因 FileReader API 的交互模式是回调, 这会导致回调地狱
// 而 withResolvers 可以用来解决这个问题
function readFileAsBase64(file: File) {
  const { promise, resolve, reject } = withResolvers<string>()
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    resolve(reader.result as string)
  }
  reader.onerror = function () {
    reject()
  }
  return promise
}
const fileBase64 = await readFileAsBase64(someFile)
```

## 高级用法

除了基本的返回以外, 还可以传入任何与 `Promise` 构造函数相同签名的构造函数

```ts
let res, rej
class NotPromise {
  constructor(executor: any) {
    // `resolve` 和 `reject` 函数和原生的 `Promise` 的行为完全不同
    // 但 `withResolvers` 会正常返回它们
    executor(
      (value: number) => {
        res = value
      },
      (value: number) => {
        rej = value
      }
    )
  }
  then = noop as any
}
const Res = withResolvers<number>(NotPromise)

Res.resolve(1)
Res.reject(2)
// res = 1, rej = 2

// 这是需要实现的签名
interface PromiseLikeConstructor extends PromiseLike {
  new <T>(
    executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void
  ): PromiseLike<T>
}
```
