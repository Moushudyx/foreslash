---
prev: false
next:
  text: 'chunk 分簇'
  link: './chunk'
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
