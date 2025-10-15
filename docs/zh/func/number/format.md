---
prev:
  text: 'scientificNotation 科学计数法'
  link: './scientificNotation'
next:
  text: 'lerp 线性插值'
  link: './lerp'
---

# format

<VersionTag version="0.3.2" />

将一个数字处理为常见的展示格式(如千分位逗号、保留两位小数等), 类似 [round](./round) 方法

## 基本用法

第一个参数接受一个数字(或字符串), 第二个参数接受格式化配置

```js
// 默认配置
format(0) // 0.00
format(-10.2) // -10.20
format('1009.996') // 1,010.00
format('23456789.998') // 23,456,790.00
// 无法辨认的数字, 输出值为字符串 NaN
format(NaN) // NaN
format('Not a Number') // NaN
// 正负无穷大, 返回其字符串格式
format(Infinity) // Infinity
format('-Infinity') // -Infinity
```

## 格式化配置

格式化具体配置如下, 默认配置是千分位逗号分割、保留两位小数

四种数值修约方法可以参考 [round](./round) 方法的文档

- `separator` 分割符, 默认为 `','`
- `separate` 按位分割, 默认为 `3`
- `decimal` 小数点, 默认为 `'.'`
- `precision` 小数精度, 默认为 `2`
- `round` 数值修约规则
  - `'round'` 四舍五入
  - `'banker'` 四舍六入五成双, 一般用于科学计算
  - `'floor'` 向下取整
  - `'ceil'` 向上取整

```js
// 部分地区将逗号与点号交换
format('-1000', { separator: '.', decimal: ',' }) // -1.000,00
// 万分位分割, 保留 3 位小数
format('123456789.1234', { separate: 4, separator: '.', decimal: ',', precision: 3 }) // 1.2345.6789,123
// 数值修约规则
// banker 四舍六入五成双, 常见于科学实验的数据修约
format('1.124', { round: 'banker' }) // 1.12
format('1.125', { round: 'banker' }) // 1.12
format('1.126', { round: 'banker' }) // 1.13
format('1.134', { round: 'banker' }) // 1.13
format('1.135', { round: 'banker' }) // 1.14
format('1.136', { round: 'banker' }) // 1.14
// floor 向下取整
format('1.124', { round: 'floor' }) // 1.12
format('1.126', { round: 'floor' }) // 1.12
format('-1.124', { round: 'floor' }) // -1.13
format('-1.126', { round: 'floor' }) // -1.13
// ceil 向上取整
format('1.124', { round: 'ceil' }) // 1.13
format('1.126', { round: 'ceil' }) // 1.13
format('-1.124', { round: 'ceil' }) // -1.12
format('-1.126', { round: 'ceil' }) // -1.12
```
