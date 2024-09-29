---
prev:
  text: 'compose 组合'
  link: './compose'
next:
  text: 'pipe 管道'
  link: './pipe'
---

# curry

柯里化(Currying)是 JS 函数式编程的重要概念

编程中的柯里化概念由数学家 [Haskell Curry](https://wikipedia.org/wiki/Haskell_Curry) 提出

也称 schönfinkelisation，因为此变换最早由 Moses Schönfinkelisation 与 Friedrich Ludwig Gottlob Frege 发明

正确使用柯里化，可以复用函数，减少重复代码

> [!NOTE] 注意
> 出于性能优化的考量，若无特殊说明，此库的任何方法都**不是柯里化**的

## 基本用法

`curry` 接受一个函数，返回柯里化后的函数

```js {2}
const fn = (a, b, c) => `a: ${a} b: ${b} c: ${c}`
const curriedFn = curry(fn)
curriedFn(1)(2)(3) // 相当于 fn(1, 2, 3)
curriedFn(1, 2)(3) // 相当于 fn(1, 2, 3)
curriedFn(1, 2, 3) // 相当于 fn(1, 2, 3)
```

柯里化后的函数支持占位符 `_` 调用

```js {3-4}
const fn = (a, b, c) => `a: ${a} b: ${b} c: ${c}`
const curriedFn = curry(fn)
curriedFn(_, 2)(1, 3) // 相当于 fn(1, 2, 3)
curriedFn(_, _, 3)(_, 2)(1) // 相当于 fn(1, 2, 3)
```

## 与 Ramda 的异同

`_` 占位符与 [Ramda](https://github.com/ramda/ramda) 的占位符 `R.__` **兼容**

```js {5-8}
import * as R from 'ramda'

const fn = (a, b, c) => `a: ${a} b: ${b} c: ${c}`
// 以下代码等价
curry(fn)(_, 2)(1, 3)
curry(fn)(R.__, 2)(1, 3)
R.curry(fn)(_, 2)(1, 3)
R.curry(fn)(R.__, 2)(1, 3)
```

此库的 `curry` 方法与 Ramda 有些区别，这里的 `curry` 方法不限制参数数量，且兼容可选参数、剩余参数的写法

```js {2,6}
const fnWithManyArgs = (a, b, c, d, e, f, g, h, i, j, k, l, m, n) => `...`
const curriedFnWithManyArgs = curry(fn) // 这里正常，而 Ramda 会报错

const fn = (a, b, c = 123) => `a: ${a} b: ${b} c: ${c}`
const curriedFn = curry(fn)
curriedFn(_, _, 3)(1, 2) // 这里相当于 fn(1, 2, 3)，而 Ramda 仍然相当于 fn(1, 2)
```
