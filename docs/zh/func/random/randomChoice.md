---
prev: false
next:
  text: 'randomDistribution 随机分布'
  link: './randomDistribution'
---

# randomChoice

从一个数组或类数组中随机抽选某一项并返回

- 与 Python 的 `random.choice` 函数类似, 但没有 `k` 参数

## 基本用法

你可以传入数组、字符串或其他有 `length` 属性的对象来随机抽选

权重参数可选, 如果不传默认所有项权重一致, 如果权重数组长度小于抽选数组长度, 缺失的部分视为 0 权重(不抽选)

```js
randomChoice([1, 2, 3]) // 1 2 3
randomChoice("abc") // "a" "b" "c"
// 使用权重参数
randomChoice("abc", [1, 2, 3]) // "b" "a" "c" "c" "b" "c" ...
```
