# Change Log

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
