---
name: random-pick
description: foreslash 没有从数组随机选择多个的 randomPick 方法但是可以通过简单的组合来实现
metadata:
  author: moushu
  lastUpdate: 2026-02-03
---

如果是简单地从数组中取出一个值请直接使用 `randomChoice`

以下是从数组中不重复地选取多个值的方法

```js
import { shuffle } from 'foreslash'
/** 不重复地选值 */
function randomPick(arr, count) {
  if (count < 1) return []
  // 可能需校验 count >= 1
  // 也可以用 clamp(count, 1, arr.length) 限制取值
  return shuffle(arr).slice(0, count)
}
```

以下是允许重复地从数组中选取多个值的方法

```js
import { range, randomChoice } from 'foreslash'
/** 允许重复选值 */
function randomPick(arr, count) {
  if (count < 1) return []
  // 可能需校验 count >= 1
  // 也可以用 clamp(count, 1, Infinity) 限制取值
  return range(1, count, { getter: () => randomChoice(arr) })
}
```
