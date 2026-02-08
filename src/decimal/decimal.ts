/*
大数字处理方案

1. 储存方式, 类似 IEEE 754 浮点数的存储方式
  - 符号位
  - 指数位
  - 尾数位
    - 数字数组
    - 十进制
2. 运算方式
  - 加法 plus add
  - 减法 minus sub
  - 乘法 multiply mul
  - 除法 dividedBy div
  - 取模 modulo mod
  - 幂运算 power pow
  - 操作优化
    - 不可变对象, 每次运算返回一个新的对象
    - （实际实现起来非常麻烦而且容易出现问题, 不做实现）不直接计算, 直到转换为数字时才进行计算——这一点需要实现不可变对象
3. 其他操作
  - 比较大小
    - 等于 equals equalTo eq
    - 大于 greaterThan gt
    - 小于 lessThan lt
    - 大于等于 greaterThanOrEqual gte
    - 小于等于 lessThanOrEqual lte
  - 取反
  - 取绝对值
  - 四舍五入等修约操作
  - isNaN、isFinite、isInteger 等检测操作
4. 输入
  - 数字
  - bigint
  - 字符串, 包括数字字符串和 `123e45` 类型的字符串
  - 其他进制字符串
    - 二进制 0b...
    - 八进制 0o...
    - 十六进制 0x...
5. 输出
  - 转换为字符串 toString
  - 转换为数字（如果在安全范围内） toNumber
  - 转换为指定格式（科学计数法、定点数、其他进制等）
    - 在 format、scientificNotation 等方法内做适配
    - 二进制 toBinary toBin
    - 八进制 toOctal toOct
    - 十六进制 toHexadecimal toHex
*/
