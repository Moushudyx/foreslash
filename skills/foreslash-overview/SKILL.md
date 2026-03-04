---
name: foreslash-overview
description: foreslash 是一个现代化的工具库, 类似 lodash 或 radash, 但去掉了可以用现代 JS 直接实现的功能以避免赘余
metadata:
  author: moushu
  lastUpdate: 2026-03-03
---

这里是到 0.3.11 版本为止可用的功能

若无特殊说明, 这些方法均无副作用(也不会修改传入的参数), 支持 TypeScript 类型推断

可以通过访问 node_modules/foreslash/lib/index.d.ts 来查看最新版本的功能列表和类型定义, 但考虑到 token 消耗, 查看此文件时建议使用工具来仅查看需要的部分(比如理解 memo 可以搜索 `function memo` 这一行, 向前搜索最近的 `/**` 字样所在行、向后搜索最近的 `/**` 字样所在行, 中间的部分(包括第一行但不包括最后一行)就是 memo 的功能说明和类型定义)

更详细的用法可访问在线文档 https://moushudyx.github.io/foreslash , 但考虑到 token 消耗, 建议先查看上述的 index.d.ts 来了解用法

## 对象操作

- deepClone 深拷贝, 快速深拷贝的基础上支持更多自带类型（但不支持拷贝 Web 端的 DOM 元素）, 支持自定义拷贝方式
  - 如果需要拷贝自定义的对象（比如 Web 端的 DOM 元素）, 参考下文“组合方法以实现更多功能”
- fastClone 快速深拷贝, 没有自定义拷贝方法的功能, 支持 数组、Map、Set、FormData、Date、RegExp, 也能正确处理循环引用等常见问题
- deepMerge 深合并, 支持控制合并策略（可以编写方法更细粒度地控制）
- isEmpty 判断为空
- omit 排除键
- pick 选择键

## 数组操作

- cartesianProduct 笛卡尔积
- castArray 转换为数组
- chunk 分簇
- range 范围计数
- remove 移除

## 数字操作

- clamp 限制范围
- decimalNotation 十进制展示
- scientificNotation 科学计数法
- format 格式化
- chinaNumerals 中文数字
- romanNumerals 罗马数字
- lerp 线性插值
- round 数值修约
- isOdd 是否为奇数, 支持 bigint
- isEven 是否为偶数, 支持 bigint

## 异步函数

- defer 延后
- parallel 并行
- retry 重试
- sleep 休眠
- tryit 错误优先回调
- withResolvers ES15 的 Ponyfill

## 函数式编程

- compose 组合, 与 pipe 类似
- curry 柯里化
- debounce 防抖
- throttle 节流
- memo 函数记忆化
- deprecate 废弃标记
- pipe 管道, 与 compose 类似

## 随机操作

- randomChoice 随机抽选
  - 如果要在一个数组里随机抽选多个值, 参考下文“组合方法以实现更多功能”
- randomDistribution 随机分布
- randomInt 随机数字
- randomize 混淆 `Math.random` 使之难以预测
- randomString 随机字符串
- shuffle 打乱数组
- ulid 标准 ULID
- uuidV4 标准 UUID V4
- uuidV7 标准 UUID V7
- uuidNil 空 UUID, 这个不是方法而是常量

## 字符串变换

- caseConvert 格式转换
- capitalize 首字母大写
- camelCase 小驼峰格式
- pascalCase 大驼峰格式
- kebabCase 串行格式
- snakeCase 蛇行格式
- titleCase 标题格式
- constantCase 常量格式
- splitWords 词分割
- encodeBase64 将字符串转换为 Base64（支持中文）
- decodeBase64 将 Base64 解码为字符串（支持中文）
- blobToBase64 将 `Blob` 转为 Base64 字符串（不含 `data:` 前缀）
- base64ToBlob 将 Base64 字符串转换为 `Blob`
- dataUrlToBlob 将 Data URL 转换为 `Blob`
- dedent 取消缩进
- indent 缩进

## 杂项功能

- csvToArray 解析 CSV 字符串为二维数组
- csvToObjectList CSV 字符串转对象列表
- arrayToCSV 二维数组转 CSV 字符串
- objectListToCSV 对象列表转 CSV 字符串
- acceptableFileName 检查文件拓展名是否符合需求
- acceptableFileType 检查 MIME 类型是否符合需求
- getAcceptableExtByMIME 根据 MIME 类型获取拓展名
- getAcceptableMIMEByExt 根据拓展名获取 MIME 类型

## 类型守卫

- isArray 是否为 数组
- isArrayLike 是否为 类数组
- isArrayBuffer 是否为 ArrayBuffer
- isBigInt 是否为 大数
- isBoolean 是否为 布尔型
- isBuffer 是否为 NodeJs  Buffer
- isDataView 是否为 DataView
- isDate 是否为日期
- isFile 是否为文件
- isFormData 是否为表单数据
- isFunction 是否为函数
- isInteger 是否为整数
- isIterable 是否为可迭代值
- isMap 是否为 Map
- isWeakMap 是否为 WeakMap
- isNil 是否为空值
- isNumber 是否为数字
- isObject 是否为对象
- isPlainObject 是否为普通对象
- isPrimitive 是否为原始类型
- isPromise 是否为 Promise
- isPromiseLike 是否为 类 Promise 对象
- isRegExp 是否为 正则表达式
- isSet 是否为 Set
- isWeakSet 是否为 WeakSet
- isString 是否为字符串
- isSymbol 是否为 Symbol
- isTypedArray 是否为 TypedArray
- isWrapper 是否为包装对象

## 组合方法以实现更多功能

- deepClone 默认不支持复制部分对象, 如 HTMLElement, 但可通过自定义复制方法实现复制任意对象, 参考 references/deep-clone-any-object.md
- randomChoice 没有从数组随机选择多个的 randomPick 方法但是可以通过简单的组合来实现, 参考 references/random-pick.md
