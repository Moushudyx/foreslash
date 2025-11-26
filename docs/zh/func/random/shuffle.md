---
prev:
  text: 'randomString 随机字符串'
  link: './randomString'
next:
  text: 'ulid 标准 ULID'
  link: './ulid'
---

# shuffle

<VersionTag version="0.1.1" />

使用 Fisher-Yates 算法打乱一个数组, 返回打乱后的新数组

- 这个算法的时间复杂度是 O(n) 因此不必担心性能问题

## 基本用法

可以传入数组或类数组 `ArrayLike<T>`, 返回一个打乱了顺序的新数组 `Array<T>`

```js
shuffle('abcdefg') // ['d', 'e', 'a', 'c', 'g', 'f', 'b']
shuffle([1, 2, 3, 4, 5, 6, 7, 8]) // [3, 2, 6, 5, 8, 1, 7, 4]
```
