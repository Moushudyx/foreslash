---
prev:
  text: 'omit 排除键'
  link: './omit'
next: false
---

# pick

给定一个对象和对象中键的列表, 返回一个**只包含**给定键的新对象

新对象是传入对象的浅拷贝

如果你希望的操作是**排除指定键**而非**提取**, 请使用 [omit](./omit)

> 如果你希望深拷贝一个对象, 请使用 `deepClone` 或 `fastClone`

## 基本用法

第一个参数传递需要处理的对象, 第二个参数传指定键列表, 也可以传单个键

```js
// 提取指定键
pick({ a: 1, b: 2, c: '' }, ['a', 'c']) // { a: 1, c: '' }
// 提取单个键
pick({ a: 1, b: 2, c: '' }, 'b') // { b: 2 }
```

## 谓词函数

第二个参数也可以传谓词函数(Predicate), 行为类似 lodash 的 `pickBy`

```js
pick({ a: 1, b: 2, c: '' }, (value, key) => value === 2 || key === 'c') // { b: 2, c: '' }
```

## 类型提示

第二个参数传指定键列表、单个键时, `pick` 将提供正确的类型提示

```js
const obj1 = pick({ a: 1, b: 2, c: '' }, ['a', 'c']) // { a: 1, c: '' }
type typeofObj1 = typeof obj1 // { a: number; c: string }

const obj2 = pick({ a: 1, b: 2, c: '' }, 'b') // { b: 2 }
type typeofObj2 = typeof obj2 // { b: number }
```

但如果第二个参数是谓词函数, `pick` 将**无法提供正确的类型提示**, 而是默认过滤结果与原类型一致

```js
// 谓词函数时可能会有类型不匹配的问题
// Typescript 无法得知最终过滤的结果, 而是认为过滤结果与原类型一致
const obj = pick({ a: 1, b: 2 }, (value, key) => value === 2) // { b: 2 }
type typeofObj = typeof obj // { a: number; b: number } <- Typescript 没有推导出正确结果
```
