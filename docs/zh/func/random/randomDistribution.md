---
prev:
  text: 'randomChoice 随机抽选'
  link: './randomChoice'
next:
  text: 'randomInt 随机数字'
  link: './randomInt'
---

# randomDistribution

<VersionTag version="0.3.3" />

一个广泛使用的[伪随机数生成算法(PRD)](https://github.com/Moushudyx/pseudo-random-distribution), 包括

返回一个方法, 输出为布尔型, 可以生成一个比正常随机序列**分布更加均匀的伪随机数列**

可以极大地避免罕见牌型出现, 缺点是初始概率很低(即**第一次命中的概率远远小于输入的 `p`**)

## 基本用法

第一个参数是目标概率, 第二个参数是相关配置

- `threshold` 精度, 数值越小, 精度越高, 序列越接近目标 `p` 值, 默认为 `5e-6`

```js
const p0_5 = pipe(randomDistribution(0.5), Number)
// for (let i = 0; i < Math.ceil(1 / 0.5); i++) p0_5() // 可选: 空转几次以避免初始概率很低导致的问题
// 如果没有空转, 则第一次输出为 0 (或者说 false) 的概率会比 `1 - p` 要大
p0_5() // 0, 1, 0, 0, 1, 1 ...
```

## getInitP

这是一个内部方法, 用于实现 `randomDistribution` 中的 PRD 算法部分, 根据目标概率, 给出一个初始概率

```js
getInitP(2 / 3) // 0.5000000000000002 -- 数学上应该是 0.5
getInitP(0.5, getInitP(0.5, 5e-7)) // 0.302103025348742
```
