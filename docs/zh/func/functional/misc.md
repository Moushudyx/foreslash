# 辅助函数

## pass

`pass` 功能是返回输入的第一个参数, 一般用于 [pipe](/zh/func/functional/pipe) 和 [compose](/zh/func/functional/compose) 中

```js {2}
pipe(Math.abs)(-1) // 1
pipe(Math.abs, pass, pass, pass)(-1) // 1
```

## passWith

`passWith` 与 `pass` 功能类似, 传入副作用函数后返回一个类似 `pass` 的函数(返回输入的第一个参数), 但执行时会调用副作用函数

```js {1}
const passWithLog = passWith(console.log)
pipe(Math.abs, DEBUG ? passWithLog : pass)(-1) // 返回 1, 但在 DEBUG 模式下会调用 console.log
```

## nope

`nope` 功能是返回 `undefined`(准确来说是 `void`), 一般用作默认(default)方法

```js {1}
const defaultConfig = { handler: noop }
// defaultConfig.handler = () => '...'
```

## not

`not` 功能是返回输入的第一个参数的相反值, 一般用于 [pipe](/zh/func/functional/pipe) 和 [compose](/zh/func/functional/compose) 中

```js {5}
not(false) // true
not(1) // false
not('') // false
// 用于取反
const isNotFinite = pipe(Number.isFinite, not)
```
