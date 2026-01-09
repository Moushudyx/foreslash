prev:
  text: 'deprecate 废弃标记'
  link: './deprecate'
next:
  text: '辅助函数'
  link: './misc'

# pipe

将多个函数组合成一个函数，从**左到右**执行并返回结果

与 [compose](./compose) 类似，但是执行顺序相反

## 基本用法

`pipe` 将多个函数组合成一个函数，从左到右依次执行

```js {1}
const pipedFn = pipe(fn1, fn2, fn3)
pipedFn(...args) // 等价于 fn3(fn2(fn1(...args)))
```

## 示例

这个示例中使用了 [curry](./curry) 方法

```js:line-numbers {13}
// 在这个示例中我们组装了一个随机首字母大写单词生成器 randomLengthString
// 输入单词最小长度、最大长度，输出一个长度随机、首字母大写的单词

import { _, curry, pipe, capitalize, randomInt, randomString } from 'foreslash'

// 使用 curry 复用 randomString，将其第二个参数置为所有小写字母
const _randomString = curry(randomString)(_, 'abcdefghijklmnopqrstuvwxyz')

// 组装 randomInt 和 _randomString, capitalize
// 1. 输入传递给 randomInt, 生成指定区间的随机数
// 2. 随机数传递给 _randomString, 生成对应长度的随机字符串
// 3. 随机字符串传递给 capitalize, 使字符串首字母大写
const randomLengthString = pipe(randomInt, _randomString, capitalize)

randomLengthString(2, 3) // 'Ye' | 'Sta' | 'Vp' | ...
```
