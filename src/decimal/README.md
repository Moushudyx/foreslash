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

#### 幂计算

涉及文件 `powerArithmetic.ts` `realPowerArithmetic.ts` `transcendentalArithmetic.ts`，包含整数幂、负整数幂、有理数幂与一般实数幂的实现逻辑

- 统一分发函数 `powerStates` 负责根据指数类型分发到对应核心实现
- 整数幂核心: `powerIntegerStates`, 使用快速幂算法实现
- 整数次根核心: `nthRootState`, 使用牛顿迭代法实现
- 有理数幂核心: `powerRationalStates`, 通过有理数识别后调用整数幂与整数次根实现
- 一般实数幂核心: `powerRealStates`, 通过 `exp(y * ln(x))` 路线实现，预留后续优化空间（如直接实现实数幂算法）

### ops
