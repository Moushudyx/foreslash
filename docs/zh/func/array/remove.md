---
prev:
  text: 'range 范围计数'
  link: './range'
next: false
---

# remove

根据给定的条件来移除数组中的元素(不会影响原数组), 功能类似 `Array.prototype.filter` 但是更加灵活

## 基本用法

第一个参数传入需要移除内容的数组, 后续参数传入要移除的条件

- 移除条件可以是某个值, 也可以是一个函数

```js
const arr = [1, 2, 3, 4, 5]
// 传入的过滤条件可以是某个值, 也可以是一个函数
remove(arr, 5) // [1, 2, 3, 4]
remove(arr, (num) => num % 2) // [1, 3, 5]
// 可以传入多个过滤条件
remove(arr, 3, 4, 5) // [1, 2]
remove(arr, (num) => num % 2, (num) => num > 4) // [1, 3]
// 可以混合传入过滤条件
remove(arr, (num) => num % 2, (num) => num > 4, 3) // [1]
```
