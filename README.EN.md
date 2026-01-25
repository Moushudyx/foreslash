# Foreslash

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/github/languages/top/Moushudyx/foreslash" alt="GitHub top lang" />
    <a href="https://codecov.io/gh/moushudyx/foreslash">
      <img src="https://codecov.io/gh/moushudyx/foreslash/graph/badge.svg" alt="codecov" />
    </a>
    <img src="https://img.shields.io/badge/license-Mulan_PSL_v2-blue" alt="GitHub license" />
    <img src="https://img.shields.io/npm/v/foreslash" alt="NPM Version" />
    <img src="https://img.shields.io/npm/dm/foreslash" alt="NPM Downloads" />
    <img src="https://img.shields.io/bundlejs/size/foreslash?label=gzipped" alt="NPM package gzipped size" />
  </p>
  <p align="center">
    Foreslash is a Javascript utilities lib which contains plenty of practical functions.
  </p>
  <p align="center">
    <a href="https://moushudyx.github.io/foreslash/en">Documentation</a>
  </p>
  <p align="center">
    <a href="./README.md">中文</a>
    |
    <span>English</span>
  </p>
</div>

## Why Foreslash

### Type definitions

Foreslash comes with comprehensive type definitions out of the box, eliminating the need to install `@types/XXX`.

- Foreslash is developed using [typescript](https://github.com/microsoft/TypeScript), and we uses [jest](https://github.com/facebook/jest) and [ts-jest](https://github.com/kulshekhar/ts-jest) for unit testing.

### Minimal Side Effects

Unless explicitly stated, methods in Foreslash are designed with **minimal side effects**.

- Methods from Foreslash do not modify mutate input data, they return a new data instead.

```js
import { shuffle } from 'foreslash'

const arr = [1, 2, 3, 4, 5, 6, 7, 8]
const shuffled = shuffle(arr) // Returns a new array [3, 2, 6, 5, 8, 1, 7, 4] while `arr` remains unchanged
```

### Functional Programming

Foreslash offers functional programming utilities methods like `curry`、`pipe`.

- For performance reasons, methods are **not curried** unless explicitly stated.
- The curry method `curry` and the placeholder `_` in Foreslash are compatible with [Ramda](https://github.com/ramda/ramda).

```js
import { curry, _ } from 'foreslash'

// const regTest = (regex) => (str) => regex.test(str) // The order of arguments is strictly defined and less flexible
const regTest = curry((str, regex) => regex.test(str)) // Currying a function to make it more flexible and reusable

const testString = regTest('123')
testString(/^\d+$/) // true
testString(/^[a-z]+$/) // false

const isDigits = regTest(_, /^\d+$/) // Using a placeholder to skip certain arguments
isDigits('123') // true
isDigits('abc') // false
```

## Install & Usage

```bash
npm install foreslash # Install with npm
yarn add foreslash # Install with yarn
pnpm install foreslash # Install with pnpm
```

Foreslash supports ESM/CJS/UMD, and ESM is recommended.

Visit [document](https://moushudyx.github.io/foreslash) for more API.

```js
// curry & randomString
import { _, curry, randomString } from 'foreslash'

randomString(3) // 'bcD' or 'T30' or '7c5' or ...

const curriedRanStr = curry(randomString)

const randomABCD = curriedRanStr(_, 'ABCD')
randomABCD(3) // 'BDC' or 'ACD' or 'DBB' or ...

const random1234 = curriedRanStr(_, '1234')
random1234(3) // '431' or '213' or '241' or ...

// fastClone
import { fastClone } from 'foreslash'

const obj = { a: { b: { c: {} } }, map: new Map() }
obj.a.b.c.d = obj
obj.map.set(obj, 'val')

const clone = fastClone(obj)
clone === obj // false
// clone Deep
clone.a.b.c === obj.a.b.c // false
clone.a.b.c.d === clone // true
// clone Map
clone.map === obj.map // false
clone.map.get(clone) === 'val' // true
```

## Compatibility

Foreslash compatible with any Javascript runtime that runs ES6 code, including Node.js and web browser.

- Internet Explorer is not supported, [core-js](https://github.com/zloirock/core-js) and transformation into ES5(ES2009) via [babel](https://babeljs.io/) might be needed.

## Credits

Foreslash based on the following open source projects.

- [jest](https://github.com/facebook/jest)
- [rollup](https://github.com/rollup/rollup)
- [ts-jest](https://github.com/kulshekhar/ts-jest)
- [ts-toolbelt](https://github.com/millsp/ts-toolbelt)
- [typescript](https://github.com/microsoft/TypeScript)
- [vitepress](https://github.com/vuejs/vitepress)
- [yarn](https://github.com/yarnpkg/yarn)

Some of the methods are inspired by the following open source projects.

- [radash](https://github.com/sodiray/radash)
- [ramda](https://github.com/ramda/ramda)
