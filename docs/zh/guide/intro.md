---
prev:
  text: '快速开始'
  link: './index'
next: false
---

# 简介

Foreslash 由 lodash、underscore、Ramda 等优秀的库启发, 结合实际需要开发而成

## 丰富的实用函数

Foreslash 提供了大量现代 Javascript 开发中常用的函数, 可以覆盖项目中的大部分需求

### 函数式开发

Foreslash 提供了 `curry` `compose` `pipe` 等函数式开发时用到的方法, 帮助您合理运用高效复用已有的方法, 降低代码中的逻辑复杂度

此外, `tryit` `withResolvers` 等异步函数相关方法可以帮助您处理复杂的异步逻辑, 提高开发效率

### 一些特殊的实用函数

Foreslash 还提供了一些不太常用的方法, 不过无需担心它们太占地方, 现代打包/构建工具的摇树优化(tree-shaking)可以轻松删去这些冗余代码

## 可靠的代码质量

Foreslash 使用 [Jest](https://github.com/facebook/jest) 作为自动化测试工具, 代码覆盖率达到 99%, 合格的代码质量会让您的项目更加可靠

Foreslash 完全由 [TypeScript](https://github.com/microsoft/TypeScript) 编写, 提供完整的类型提示, 无需额外安装 `@types/XXX` 以获取类型, 这会让您的开发过程更加顺滑

如果您也使用 TypeScript 编写代码, Foreslash 会进一步提高您的开发体验

### 自动化测试

您可以执行以下指令以运行自动化测试, 如果您熟悉 Jest, 那么您也可以用自己的方式运行测试

```bash
# 您可以使用这个指令来运行自动化测试
yarn test
```

### 基本零依赖

除了一个用于提供类型提示的库 [ts-toolbelt](https://github.com/millsp/ts-toolbelt) 以外, Foreslash 没有其他依赖

### 兼容 Ramda

Foreslash 的 `curry` 方法及 `_` 占位符与 Ramda 的对应功能兼容, 具体可见[这个文档](../func/functional/curry.md)

```js {6-9}
import { curry, _ } from 'foreslash'
import * as R from 'ramda'

const fn = (a, b, c) => `a: ${a} b: ${b} c: ${c}`
// 以下代码结果一致
curry(fn)(_, 2)(1, 3)
curry(fn)(R.__, 2)(1, 3)
R.curry(fn)(_, 2)(1, 3)
R.curry(fn)(R.__, 2)(1, 3)
```

## 完善的在线文档

Foreslash 使用 [VitePress](https://github.com/vuejs/vitepress) 搭建了部署在 Github Pages 上的在线文档

这个在线文档由 Github Actions 更新, 确保内容永远是最新的

您可以随时在 Github 上提 issue 或者 PR 来指出文档中的问题或帮助我们完善文档

您也可以点击页面左下角的“在 GitHub 上编辑此页面”查看这个当前页面的源码
