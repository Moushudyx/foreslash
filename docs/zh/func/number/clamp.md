---
prev: false
next: false
---

# clamp

将一个数字限制在指定范围内, 广泛用于数据处理

## 基本用法

接受四个参数, 前三个参数分别为初始值, 范围下限和上限, 第四个参数为配置项, 可选

```JS
clamp(5, 0, 10) // 5
clamp(15, 0, 10) // 10
clamp(-5, 0, 10) // 0
clamp(NaN, 0, 10) // 0 初始值为 NaN 时, 返回下限
// 可以用 default 参数指定超出范围后返回的默认值
clamp(5, 0, 10, { default: 6 }) // 5
clamp(15, 0, 10, { default: 6 }) // 6
clamp(-5, 0, 10, { default: 6 }) // 6
clamp(NaN, 0, 10, { default: 6 }) // 6
// 可以用 defaultMin 和 defaultMax 参数分别指定超出上下限后返回的默认值
clamp(5, 0, 10, { defaultMin: 6, defaultMax: 9 }) // 5
clamp(15, 0, 10, { defaultMin: 6, defaultMax: 9 }) // 9
clamp(-5, 0, 10, { defaultMin: 6, defaultMax: 9 }) // 6
clamp(NaN, 0, 10, { defaultMin: 6, defaultMax: 9 }) // 6
```
