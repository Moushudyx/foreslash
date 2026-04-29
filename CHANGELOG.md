# Change Log

## Version 0.4.0-snapshot.1 - 2026-04-29

Since version 0.4.0, the automated testing tool will switch to Vitest, the package manager will switch to pnpm, and the bundler will switch to rolldown, these modern tools will improve development efficiency and build performance.

This version introduces `createFormData`, which can encode an object into an `ArrayBuffer` of `multipart/form-data` in environments without native `FormData`, and can be sent directly as the request body. A common use case is uploading files in environments like WeChat Mini Programs.

- Feat 🥥 Function(s) added: `createFormData` `createFormDataBoundary`
- Feat 🥥 Feature(s) added: `ForNumber`
- Feat 🥥 Function(s) change: `decimalNotation` now support `ForeNumber` input
- Other fixes and improvements

从 0.4.0 版本开始, 自动化测试工具将改用 Vitest, 包管理工具将改用 pnpm, 打包工具将改用 rolldown, 这些现代化的工具将提升开发效率和构建性能

这个版本引入的 `createFormData` 可以在没有原生 `FormData` 的环境中, 将对象编码为 `multipart/form-data` 的 `ArrayBuffer`, 可直接作为请求体发送, 常见用途是在微信小程序等环境中上传文件

- 功能 🥥 添加函数: `createFormData` `createFormDataBoundary`
- 功能 🥥 添加特性: `ForNumber` 用于高精度的数值运算
- 功能 🥥 变更函数: `decimalNotation` 现在支持 `ForeNumber` 输入
- 其他修复与优化

## Version 0.3.11 - 2026-02-08

Added Agent Skills

- Feat 🥥 Skill(s) added: `random-pick` `deep-clone-any-object`
- Feat 🥥 Function(s) added: `randomize`

添加了智能体技能(Agent Skills)

- 功能 🥥 添加技能: `random-pick` `deep-clone-any-object`
- 功能 🥥 添加函数: `randomize`

## Version 0.3.10 - 2026-02-01

- Fix 🥕 Bug fixed: `format` config options `separator` and `decimal` now support empty string input

- 修复 🥕 缺陷修复: `format` 的配置项 `separator`、`decimal` 支持传入空字符串的

## Version 0.3.9 - 2026-01-31

Added functions to generate CSV strings

- Feat 🥥 Function(s) added: `arrayToCSV` `objectListToCSV` `csvToArray` `csvToObjectList`
- Feat 🥥 Function(s) change: Refactor `getGlobalThis` to avoid `ReferenceError` in some case
- Other fixes and improvements

添加了生成 CSV 字符串的函数

- 功能 🥥 添加函数: `arrayToCSV` `objectListToCSV` `csvToArray` `csvToObjectList`
- 功能 🥥 变更函数: 重写 `getGlobalThis` 避免部分环境下调用出现 `ReferenceError`
- 其他修复与优化

## Version 0.3.8 - 2026-01-25

- Feat 🥥 Function(s) added: `constantCase`
- Feat 🥥 Function(s) exposed: `transferNumberToSupUniCode`
- Other fixes and improvements

- 功能 🥥 添加函数: `constantCase`
- 功能 🥥 公开函数: `transferNumberToSupUniCode`
- 其他修复与优化

## Version 0.3.7 - 2026-01-24

Add a method to convert numbers to Chinese numerals

- Feat 🥥 Function(s) added: `chinaNumerals`

添加了将数字转换为中文的方法

- 功能 🥥 添加函数: `chinaNumerals`

## Version 0.3.6 - 2026-01-09

Unstable version

Added some Base64 related methods

- Feat 🥥 Functions added: `encodeBase64` `decodeBase64` `blobToBase64` `base64ToBlob` `deprecate` and so forth
- Other fixes and improvements

不稳定版本

添加了一些 Base64 相关的方法

- 功能 🥥 添加函数: `encodeBase64` `decodeBase64` `blobToBase64` `base64ToBlob` `deprecate` 等
- 其他修复与优化

## Version 0.3.5 - 2025-11-30

Unstable version

- Feat 🥥 Functions added: `uuidV7`
- Feat 🥥 Function change: `isOdd` and `isEven` now support BigInt
- Fix 🥕 Document: Added version tags to several methods
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `uuidV7`
- 功能 🥥 变更函数: `isOdd` 和 `isEven` 现在支持 BigInt
- 修复 🥕 文档: 补充部分方法的版本标签
- 其他修复与优化

## Version 0.3.4 - 2025-11-17

Unstable version

- Feat 🥥 Functions added: `omit` `pick`
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `omit` `pick`
- 其他修复与优化

## Version 0.3.3 - 2025-11-05

Unstable version

- Feat 🥥 Functions added: `lerp` `scientificNotation` `castArray` `romanNumerals` `randomDistribution` and so forth
- Fix 🥕 Document: Added version tags to `memo` and description to several methods
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `lerp` `scientificNotation` `castArray` `randomDistribution` 等
- 修复 🥕 文档: 补充 `memo` 的版本标签和部分方法的说明
- 其他修复与优化

## Version 0.3.2 - 2025-09-23

Unstable version

- Feat 🥥 Functions added: `chunk` `decimalNotation` `round` `format` `isPlainObject` `cartesianProduct` **and** so forth
- Feat 🥥 Type Utils: `Not` `IsNegative` `IsZero` `IsPositive` `Stringify`
- Fix 🥕 Document: Added version tags to 19 methods
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `chunk` `decimalNotation` `round` `format` `isPlainObject` `cartesianProduct` 等
- 功能 🥥 类型工具: `Not` `IsNegative` `IsZero` `IsPositive` `Stringify`
- 修复 🥕 文档: 补充 19 个方法的版本标签
- 其他修复与优化

## Version 0.3.1 - 2025-08-14

Unstable version

- Feat 🥥 Functions added: `indent` and so forth
- Use GitHub Actions to automate the npm publish/github release process
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `indent` 等
- 使用 GitHub Actions 实现自动化 npm 发版/github release 流程
- 其他修复与优化

## Version 0.3.0 - 2025-07-01

Unstable version

- Feat 🥥 Functions added: `capitalize` `deepMerge` `isBlob` and so forth
- Feat 🥥 Function change: `deepClone` now support `Blob` and `File`
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `capitalize` `deepMerge` `isBlob` 等
- 功能 🥥 变更函数: `deepClone` 现在支持 `Blob` 和 `File`
- 其他修复与优化

## Version 0.2.4 - 2025-05-29

Unstable version

- Feat 🥥 Functions added: `retry` `parallel`
- Change 🥟 Dependencies change: upgrade devDependencies `rollup` `@rollup/plugin-typescript` `rollup-plugin-dts` `vitepress`
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `retry` `parallel`
- 变更 🥟 依赖变更: 升级开发依赖 `rollup` `@rollup/plugin-typescript` `rollup-plugin-dts` `vitepress`
- 其他修复与优化

## Version 0.2.3 - 2025-03-28

Unstable version

- Feat 🥥 Functions added: `defer`
- Fix 🥕 Bug fixed: `debounce` doesn't apply the last callee's arguments
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `defer`
- 修复 🥕 缺陷修复: `debounce` 没有传入最后一次获取的参数
- 其他修复与优化

## Version 0.2.2 - 2025-03-18

Unstable version

- Feat 🥥 Functions added: `throttle` `debounce` `remove` and `clamp`
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `throttle` `debounce` `remove` 和 `clamp`
- 其他修复与优化

## Version 0.2.1 - 2025-02-23

Unstable version

- Feat 🥥 Functions added: `memo`
- Feat 🥥 Function change: `range` now support single parameter invocation, *compatible with Radash*
- Fix 🥕 Bug fixed: `deepClone` now processes `DataView.buffer` properly
- Fix 🥕 Bug fixed: Correct type definition filepath
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `memo`
- 功能 🥥 变更函数: `range` 现在支持单个参数的调用, *与 Radash 兼容*
- 修复 🥕 缺陷修复: `deepClone` 现在能正确处理 `DataView.buffer`
- 修复 🥕 缺陷修复: 修复了类型定义文件路径
- 其他修复与优化

## Version 0.2.0 - 2025-02-16

Unstable version

- Change 🥟 Functions changed: `caseCamel` `casePascal` `caseKebab` `caseSnake` now deprecated, will be removed in the future, use `camelCase` `pascalCase` `kebabCase` `snakeCase` instead
- Feat 🥥 Functions added: `isTypedArray` `range` `titleCase` `tryit` `withResolvers` and so forth
- Feat 🥥 Function change: `isEmpty` now validates Date object
- Feat 🥥 Function change: `fastClone` now clones FormData object
- Wip 🍉 Function wip: `deepClone` still on progress
- Other fixes and improvements

不稳定版本

- 变更 🥟 变更函数: `caseCamel` `casePascal` `caseKebab` `caseSnake` 弃用，将来会移除，请改用 `camelCase` `pascalCase` `kebabCase` `snakeCase`
- 功能 🥥 添加函数: `isTypedArray` `range` `titleCase` `tryit` `withResolvers` 等
- 功能 🥥 变更函数: `isEmpty` 现在会校验 Date 对象
- 功能 🥥 变更函数: `fastClone` 现在会复制 FormData 对象
- 开发中 🍉 函数开发中: `deepClone` 尚在开发中
- 其他修复与优化

## Version 0.1.2 - 2025-01-09

Unstable version

- Feat 🥥 Functions added: `caseConvert` `uuidV4` `ulid` and so forth
- Feat 🥥 Misc functions added: `acceptableFileName` `acceptableFileType` `getAcceptableExtByMIME` and `getAcceptableMIMEByExt`
- Fix 🥕 Bug fixed: Unexpected export `_fastClone`
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `caseConvert` `uuidV4` `ulid` 等
- 功能 🥥 添加杂项函数: `acceptableFileName` `acceptableFileType` `getAcceptableExtByMIME` 和 `getAcceptableMIMEByExt`
- 修复 🥕 缺陷修复: 不应导出 `_fastClone`
- 其他修复与优化

## Version 0.1.1 - 2024-11-11

Unstable version

- Feat 🥥 Functions added: `isEmpty` `shuffle` `isPrimitive` and so forth
- Fix 🥕 Bug fixed: `isNil(document.all)` expected to be `false`
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `isEmpty` `shuffle` `isPrimitive` 等
- 修复 🥕 缺陷修复: `isNil(document.all)` 应为 `false`
- 其他修复与优化

## Version 0.1.0 - 2024-09-28

Unstable version

- Feat 🥥 Functions added: `fastClone` `compose` `getTag` and so forth
- Feat 🥥 Function change: `curry` now supports optional arguments
- Fix 🥕 Bug fixed: Type hint for `passWith` now corrected
- Other fixes and improvements

不稳定版本

- 功能 🥥 添加函数: `fastClone` `compose` `getTag` 等
- 功能 🥥 变更函数: `curry` 支持可选参数
- 修复 🥕 缺陷修复: 修复了 `passWith` 的类型提示
- 其他修复与优化
