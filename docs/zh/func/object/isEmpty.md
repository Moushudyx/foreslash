---
prev:
  text: 'deepMerge 深合并'
  link: './deepMerge'
next: false
---

# isEmpty

检查一个对象是否为空，常见情况如下：

1. 空数组 `[]`、空[类数组对象](../is/is#ArrayLike)
2. 自身没有可枚举属性的对象 `{}`
3. 无效的 `Date`
4. 空的 `Map`、`Set`
5. 字节长度为 0 的 `ArrayBuffer`、`Buffer`
6. 空字符串 `''`、数字 `0`
7. `undefined`、`null`

> [!NOTE] 注意
> 此方法会将[包装对象](../is/is#Wrapper)视为空

## 基本用法

```js {25,26}
isEmpty({}) // true
isEmpty({ a: 1 }) // false

isEmpty([]) // true
isEmpty([1]) // false

isEmpty(new Date('invalid')) // true
isEmpty(new Date()) // false

isEmpty(new Set()) // true
isEmpty(new Set([1])) // false

isEmpty(0) // true
isEmpty(123) // false

isEmpty('') // true
isEmpty('123') // false

isEmpty(null) // true
isEmpty(undefined) // true

isEmpty(() => 0) // false

// 此方法会将包装对象视为空
isEmpty(new Number(0)) // true
isEmpty(new String('')) // true
```
