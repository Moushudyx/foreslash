---
prev:
  text: 'cartesianProduct 笛卡尔积'
  link: './cartesianProduct'
next:
  text: 'range 范围计数'
  link: './range'
---

# chunk

<VersionTag version="0.3.2" />

将一个数组分割成多个固定长度的簇

## 基本用法

第一个参数传入需要分簇的数组或类数组对象, 第二个参数传入每个簇的大小

- 如果不传簇大小参数, 默认的簇大小为 `2`

```js
// 默认的簇大小为 2
chunk([1, 2, 3, 4, 5]) // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3, 4, 5], 3) // [[1, 2, 3], [4, 5]]
chunk([1, 2, 3, 4, 5], 1) // [[1], [2], [3], [4], [5]]
// 可以识别类数组对象
chunk('12345', 3) // [['1', '2', '3'], ['4', '5']]
chunk({0: 1, 1: 2, 2: 3, length: 3}, 2) // [[1, 2], [3]]
// 如果传入了不正常的 size 则返回空数组
chunk([1, 2, 3, 4, 5], 0) // []
chunk([1, 2, 3, 4, 5], -1) // []
```

## 类型提示

在簇小于等于 `9` 的情况下会以元组数组的形式提供类型提示

```js
// 簇大小小于等于 9
chunk([1, 2, 3, 4, 5]) // [number, number][]
chunk([1, 2, '3', 4, '5'], 3) // [number | string, number | string, number | string][]
chunk('12345', 3) // [string, string, string][]
// 簇大小过大时
chunk('123457890', 10) // string[][]
// 如果传入了不正常的 size 则返回空数组
chunk([1, 2, 3, 4, 5], 0) // never[]
chunk([1, 2, 3, 4, 5], -1) // never[]
```
