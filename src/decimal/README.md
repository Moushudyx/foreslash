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

Foreslash 中的数字格式转换方法内部使用 `decimalNotation` 将数字转换为十进制表示, 因此只需要在这个方法内部支持 `ForeNumber` 的输入解析, 即可支持 `scientificNotation` 等方法

`ForeNumber` 的 `toBinary`/`toOctal`/`toHexadecimal`（以及 `toBin`/`toOct`/`toHex` 别名）直接基于内部 limb 转换, 不经过原生 `number`; `precision` 表示最多保留的小数位数, 默认 32；超出位数时截断, 不添加 `0b`/`0o`/`0x` 前缀, 十六进制字母为小写, 结果会去掉小数末尾的零; 整数部分不受 `precision` 限制

### core

内部使用万进制表示法存储数字, 以便在高精度计算中减少进位操作的开销, 使用万进制可以在保证精度的同时提高计算效率

#### 幂计算

涉及文件（位于 `core/power/` 目录）：`powerArithmetic.ts`（入口）、`integerPower.ts`、`rationalPower.ts`、`nthRoot.ts`、`realPowerArithmetic.ts`、`transcendentalArithmetic.ts`，包含整数幂、负整数幂、有理数幂、n 次根与一般实数幂的实现逻辑

- 统一分发函数 `powerStates` 在 `powerArithmetic.ts` 中，负责根据指数类型分发到对应核心实现
- 整数幂核心: `powerIntegerStates` (integerPower.ts), 使用快速幂算法实现
- n 次方根核心: `nthRootState` (nthRoot.ts), 使用牛顿迭代法实现
- 有理数幂核心: `powerRationalStates` (rationalPower.ts), 接收已校验的 RationalExponent，归约为"先整数幂 → 再开 n 次根"
- 指数分类: `classifyExponent` / `tryConvertExponentToRational` (rationalPower.ts), 自动识别有限小数为有理数
- 分数字符串解析: `inspectFractionExponentString` (rationalPower.ts), 显式 "m/n" 格式的唯一校验入口
- 一般实数幂核心: `powerRealStates` (realPowerArithmetic.ts), 通过 `exp(y * ln(x))` 路线实现，预留后续优化空间
- `transcendentalArithmetic` 当前使用级数近似与阈值收敛控制实现 `ln/exp`，并通过 `2^n` 内部状态缩放与缓存降低重复计算开销
- `realPowerMode` 支持 `approx/strict`，其中 `strict` 仅允许整数幂与有理数幂，`approx` 才进入一般实数幂路线

### ops
