---
prev: false
next:
  text: '快速开始'
  link: './getting-started'
---

# ForeNumber 高精度数值

<VersionTag version="0.4.0" />

ForeNumber 是 Foreslash 提供的高精度十进制数类型, 适用于金额等精度敏感的计算, 或是避免原生 `number` 的浮点误差, 以及承载原生 `number` 无法安全表示的大数值

```ts
import { ForeNumber } from 'foreslash'

new ForeNumber('0.1').plus('0.2').toString() // '0.3' 没有浮点误差
new ForeNumber('90071992547409931234').toString()
// '90071992547409931234' 精确表示大数值
```

使用字符串或 `bigint` 输入可以避免先经过原生 `number` 而产生精度损失

计算精度受全局上下文配置控制, **并非无限精度**; 开始使用前, 建议先了解[精度与舍入](./precision)

## 文档导航

- [快速开始](./getting-started)：创建实例、检查数值并进行链式调用
- [算术与比较](./arithmetic)：加减乘除、取模和大小比较
- [精度与舍入](./precision)：设置计算精度、除法精度及舍入模式
- [幂与根](./power)：幂运算、平方根和 n 次方根
- [格式转换](./conversion)：十进制、科学计数法和其他进制
