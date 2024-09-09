# Foreslash

Foreslash 是一个 Javascript 工具库，包含大量实用函数。

Foreslash is a Javascript utilities lib which contains plenty of practical functions.

## 设计理念 Design Concept

### 函数式 Functional

此库提供了诸如`curry`、`pipe`等函数式编程的方法，但若无特殊说明，此库的任何方法都**不是柯里化**的。

- 这是出于性能优化和调试方便的考量。

此库的柯里化方法`curry`和柯里化占位符`_`与 [ramda](https://github.com/ramda/ramda) 兼容。

### 不变性 Immutability

若无特殊说明，此库的任何方法都是**不可变**的，即不会修改传入的原数据，返回值将是一个新的数据。

### 类型 Type

此库使用 [typescript](https://github.com/microsoft/TypeScript) 编写，并使用 [jest](https://github.com/facebook/jest) 和 [ts-jest](https://github.com/kulshekhar/ts-jest) 来单元测试。

## 安装与使用 Install & Usage

```bash
npm install foreslash # 使用 npm 安装
yarn add foreslash # 使用 yarn 安装
pnpm install foreslash # 使用 pnpm 安装
```

```js
import { _ as __, curry, randomString } from 'foreslash'

randomString(3) // 'bcD' or 'T30' or '7c5' or ...

const randomABCD = curry(randomString)(__, 'ABCD')
randomOct(3) // 'BDC' or 'ACD' or 'DBB' or ...
```

## 兼容性 Compatibility

此库兼容任何能正确运行 ES6 代码的 Javascript 环境，包括 node.js 和浏览器

- 不支持 Internet Explorer，但是使用 [core-js](https://github.com/zloirock/core-js) 处理并由 [babel](https://babeljs.io/) 转译为 ES5(ES2009) 后可以使用

### polyfill

此库没有 polyfill，如果要在旧版浏览器中使用，请使用 [core-js](https://github.com/zloirock/core-js) 或其他 polyfill 工具

### ES2015

此库使用 ES6(ES2015) 语法，如果要在旧版浏览器中使用，请使用 [babel](https://babeljs.io/) 或其他打包/转译工具

## 开源软件 Credits

- [jest](https://github.com/facebook/jest)
- [rollup](https://github.com/rollup/rollup)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [ts-toolbelt](https://github.com/millsp/ts-toolbelt)
- [typescript](https://github.com/microsoft/TypeScript)
- [yarn](https://github.com/yarnpkg/yarn)
