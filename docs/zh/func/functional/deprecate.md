---
prev:
  text: 'memo 记忆化'
  link: './memo'
next:
  text: 'pipe 管道'
  link: './pipe'
---

# deprecate

<VersionTag version="0.3.6" />

将一个函数标记为“已废弃”（不推荐使用）

包装后的函数在“首次调用”时会通过 `console.warn` 输出警告信息, 后续调用不再重复告警

可选 `code` 前缀, 便于在控制台中快速定位来源, 此时警告信息会以 `[code] 警告信息` 的格式输出

- 与 Node.js 的 `util.deprecate` 类似
- 完全透传 `this` 与参数, 不影响函数行为

常见的使用场景是, 在迁移期间使用该方法提醒开发者尽快替换旧接口

## 基本用法

```js {5}
const fn = () => {
  console.log('test')
  return 123
}
const deprecateFn = deprecate(fn, '不建议使用该方法', 'Foreslash')
const res = deprecateFn() // 123（首次调用，触发一次告警）
deprecateFn()             // 后续不再告警
deprecateFn()
// console:
// test
// [Foreslash] 不建议使用该方法
// test
// test
```

## 透传 this 与参数

```js {7}
const obj = {
  base: 5,
  add(x, y) {
    return this.base + x + y
  },
}
const addDeprecated = deprecate(obj.add, '该方法已废弃')
addDeprecated.call({ base: 1 }, 2, 3) // 6（this 与参数保持一致）
```
