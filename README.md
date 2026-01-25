# Foreslash

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/github/languages/top/Moushudyx/foreslash" alt="GitHub top lang" />
    <a href="https://codecov.io/gh/moushudyx/foreslash">
      <img src="https://codecov.io/gh/moushudyx/foreslash/graph/badge.svg" alt="codecov" />
    </a>
    <a href="https://github.com/moushudyx/foreslash/blob/master/LICENSE">
      <img src="https://img.shields.io/badge/license-Mulan_PSL_v2-blue" alt="GitHub license" />
    </a>
    <img src="https://img.shields.io/npm/v/foreslash" alt="NPM Version" />
    <img src="https://img.shields.io/npm/dm/foreslash" alt="NPM Downloads" />
    <img src="https://img.shields.io/bundlejs/size/foreslash?label=gzipped" alt="NPM package gzipped size" />
  </p>
  <p align="center">
    Foreslash 是一个 Javascript 工具库，包含大量实用函数。
  </p>
  <p align="center">
    Foreslash is a Javascript utilities lib which contains plenty of practical functions.
  </p>
  <p align="center">
    <a href="https://moushudyx.github.io/foreslash">文档</a>
    |
    <a href="https://moushudyx.github.io/foreslash/en">Documentation</a>
  </p>
  <p align="center">
    <span>中文</span>
    |
    <a href="./README.EN.md">English</a>
  </p>
</div>

## 为何选择 Foreslash

### 完整类型提示

Foreslash 自带完整的类型提示，无需安装 `@types/XXX`。

- Foreslash 使用 [typescript](https://github.com/microsoft/TypeScript) 开发，并使用 [jest](https://github.com/facebook/jest) 和 [ts-jest](https://github.com/kulshekhar/ts-jest) 编写单元测试。

### 低副作用

若无特殊说明，Foreslash 的任何方法都**几乎没有副作用**

- Foreslash 的方法不会修改传入的原数据，返回值将是一个新的数据。

```js
import { shuffle } from 'foreslash'

const arr = [1, 2, 3, 4, 5, 6, 7, 8]
const shuffled = shuffle(arr) // 返回新的数组 [3, 2, 6, 5, 8, 1, 7, 4] 同时 arr 并没有受到影响
```

### 函数式编程

Foreslash 提供了诸如 `curry`、`pipe` 等函数式编程的方法。

- 出于性能优化的考量，若无特殊说明，此库的任何方法都**不是柯里化**的。
- Foreslash 的柯里化方法 `curry` 和柯里化占位符 `_` 与 [ramda](https://github.com/ramda/ramda) 兼容。

```js
import { curry, _ } from 'foreslash'

// const regTest = (regex) => (str) => regex.test(str) // 传统方法，传入参数的顺序有强制规定不够灵活
const regTest = curry((str, regex) => regex.test(str)) // 这里柯里化了一个函数使其能更灵活地复用

const testString = regTest('123')
testString(/^\d+$/) // true
testString(/^[a-z]+$/) // false

const isDigits = regTest(_, /^\d+$/) // 使用占位符来跳过填充某些参数，传统方法做不到这点
isDigits('123') // true
isDigits('abc') // false
```

## 安装与使用

```bash
npm install foreslash # 使用 npm 安装
yarn add foreslash # 使用 yarn 安装
pnpm install foreslash # 使用 pnpm 安装
```

Foreslash 支持 ESM、CJS、UMD 三种引入方式，推荐使用 ESM。

更多 API 请参考[文档](https://moushudyx.github.io/foreslash)。

```js
// curry & randomString
import { _, curry, randomString } from 'foreslash'

randomString(3) // 'bcD' 或 'T30' 或 '7c5' 或 ...

const curriedRanStr = curry(randomString)

const randomABCD = curriedRanStr(_, 'ABCD')
randomABCD(3) // 'BDC' 或 'ACD' 或 'DBB' 或 ...

const random1234 = curriedRanStr(_, '1234')
random1234(3) // '431' 或 '213' 或 '241' 或 ...

// fastClone
import { fastClone } from 'foreslash'

const obj = { a: { b: { c: {} } }, map: new Map() }
obj.a.b.c.d = obj // 常见的循环引用
obj.map.set(obj, 'val') // Map 键上的循环引用

const clone = fastClone(obj)
clone === obj // false
// 处理深层级对象
clone.a.b.c === obj.a.b.c // false
clone.a.b.c.d === clone // true
// 处理 Map
clone.map === obj.map // false
clone.map.get(clone) === 'val' // true
```

## 兼容性

Foreslash 兼容任何能正确运行 ES6 代码的 Javascript 环境，包括 Node.js 和浏览器。

- 不支持 Internet Explorer，但是使用 [core-js](https://github.com/zloirock/core-js) 处理并由 [babel](https://babeljs.io/) 转译为 ES5(ES2009) 后可以使用。

## 开源软件

Foreslash 的诞生离不开这些开源项目：

- [jest](https://github.com/facebook/jest)
- [rollup](https://github.com/rollup/rollup)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [ts-toolbelt](https://github.com/millsp/ts-toolbelt)
- [typescript](https://github.com/microsoft/TypeScript)
- [vitepress](https://github.com/vuejs/vitepress)
- [yarn](https://github.com/yarnpkg/yarn)

部分方法灵感源于以下开源项目：

- [radash](https://github.com/sodiray/radash)
- [ramda](https://github.com/ramda/ramda)
