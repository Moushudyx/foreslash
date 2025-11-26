---
prev:
  text: 'isEmpty 判断为空'
  link: './isEmpty'
next:
  text: 'pick 选择键'
  link: './pick'
---

# omit

<VersionTag version="0.3.4" />

给定一个对象和对象中键的列表, 返回一个**排除**给定键的新对象

新对象是传入对象的浅拷贝

如果你希望的操作是**选择指定键**而非排除, 请使用 [pick](./pick)

> 如果你希望深拷贝一个对象, 请使用 `deepClone` 或 `fastClone`

## 基本用法

第一个参数传递需要处理的对象, 第二个参数传指定键列表, 也可以传单个键

```js
// 排除指定键
omit({ a: 1, b: 2, c: '' }, ['a', 'c']) // { b: 2 }
// 排除单个键
omit({ a: 1, b: 2, c: '' }, 'b') // { a: 1, c: '' }
```

## 谓词函数

第二个参数也可以传谓词函数(Predicate), 行为类似 lodash 的 `omitBy`

```js
omit({ a: 1, b: 2, c: '' }, (value, key) => value === 2 || key === 'c') // { a: 1 }
```

## 类型提示

第二个参数传指定键列表、单个键时, `omit` 将提供正确的类型提示

```js
const obj1 = omit({ a: 1, b: 2, c: '' }, ['a', 'c']) // { b: 2 }
type typeofObj1 = typeof obj1 // { b: number }

const obj2 = omit({ a: 1, b: 2, c: '' }, 'b') // { a: 1, c: '' }
type typeofObj2 = typeof obj2 // { a: number; c: string }
```

但如果第二个参数是谓词函数, `omit` 将**无法提供正确的类型提示**, 而是默认过滤结果与原类型一致

```js
// 谓词函数时可能会有类型不匹配的问题
// Typescript 无法得知最终过滤的结果, 而是认为过滤结果与原类型一致
const obj = omit({ a: 1, b: 2 }, (value, key) => value === 2) // { a: 1 }
type typeofObj = typeof obj // { a: number; b: number } <- Typescript 没有推导出正确结果
```
