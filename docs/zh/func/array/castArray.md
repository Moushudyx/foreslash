---
prev:
  text: 'cartesianProduct 笛卡尔积'
  link: './cartesianProduct'
next:
  text: 'chunk 分簇'
  link: './chunk'
---

# castArray

<VersionTag version="0.3.3" />

将传入的值转换为一个数组

## 基本用法

此方法的输出值永远是一个数组

如果输入值是数组, 则输出的数组是其**浅拷贝**; 如果输入不是数组，则将输入包进一个新数组里

```js
// 如果输入不是数组，则将输入包进一个新数组里
castArray(1) // [1]
castArray('1') // ['1']
castArray(null) // [null]
// 如果输入值是数组, 则输出的数组是其浅拷贝
castArray([1, 2, 3, 4, 5]) // [1, 2, 3, 4, 5]
```

## 类型提示

此方法为传入的类型提供精确的类型提示

```ts
castArray(1) // number[]
castArray('1') // string[]
castArray([1] as any[]) // any[]
castArray([1, '']) // (number | string)[]
castArray([1] as number[] | string) // number[] | string[]
```
