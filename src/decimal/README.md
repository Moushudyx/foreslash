# ForeNumber

一个基于万进制表示的高精度十进制数实现，支持任意精度算术运算、比较、进制转换等功能

## 功能

主要功能自 0.4.0 版本开始可用

- 输入解析（支持 `number` `string` `bigint` `ForeNumber`）
- 比较（`eq` `gt` 等方法及别名）
- 加减乘除（支持链式调用）
- 取反、绝对值、数值修约

## 实现细节

### attach

将拆分的实例方法挂载到 `ForeNumber.prototype`, 保持主类简洁

### convert

### core

### ops
