---
prev: false
next:
  text: 'castArray 转换为数组'
  link: './castArray'
---

# cartesianProduct

<VersionTag version="0.3.2" />

将多个数组以[笛卡尔积](https://wikipedia.org/wiki/Cartesian_product)的形式拼接为一个新的二维数组

## 基本用法

传入多个数组(可以识别类数组对象), 得到笛卡尔积

```js
// 传入数组即可
cartesianProduct([1, 2, 3, 4, 5])
// [[1], [2], [3], [4], [5]]

// 可以识别类数组对象
cartesianProduct([1, 2], '12')
// [[1, '1'], [1, '2'], [2, '1'], [2, '2']]
cartesianProduct([1, 2], '12', { 0: 3, 1: 4, length: 2 })
// [[1, '1', 3], [1, '1', 4], [1, '2', 3], [1, '2', 4],
//  [2, '1', 3], [2, '1', 4], [2, '2', 3], [2, '2', 4]]

// 空集与其他集合的笛卡尔积是空集
cartesianProduct([1, 2, 3, 4, 5], '12345', [])
// []
```

## 类型提示

在传入参数数量小于等于 `8` 的情况下会以元组数组的形式提供类型提示

- 超出此数量时会仅返回 `any[][]`

```js
cartesianProduct([1, 2, 3]) // [number][]
cartesianProduct([1, 2], '12', { 0: 3, 1: 4, length: 2 }) // [number, string, number][]
```
