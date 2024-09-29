# 快速开始

## 安装

```bash
npm install foreslash
yarn add foreslash
pnpm install foreslash
```

如果你的网络环境无法访问 npm，可以使用以下命令安装：

```bash
npm install foreslash --registry=https://registry.npmmirror.com
yarn add foreslash --registry=https://registry.npmmirror.com
pnpm install foreslash --registry=https://registry.npmmirror.com
```

## 使用

Foreslash 打包为 ESM、CJS、UMD 格式, 可以直接在浏览器与 Node.js 中使用

常用的方法有深拷贝 [deepClone](../func/object/deepClone)、柯里化 [curry](../func/functional/curry) 等


> [!NOTE] 注意
> 出于性能优化的考量，若无特殊说明，此库的任何方法都**不是柯里化**的
>
> 除非有特殊需求, 推荐使用性能更高、体积更小的 [fastClone](../func/object/deepClone#fastClone) 替代 [deepClone](../func/object/deepClone)

```js {6-8,11-15}
import { _, curry, randomString, fastClone } from 'foreslash'

// randomString 默认输出的字符为 大小写字母+数字
// 使用 curry 柯里化后, 可以指定第二个参数
// 最终可以组合为一个输出指定数量的随机数字的方法
const randomNumber = curry(randomString)(_, '1234567890')
randomNumber(1) // '1' | '0' | '5'
randomNumber(2) // '26' | '51' | '90'

// fastClone 可以应付大部分场景, 包括循环引用等情况
const obj = { arr: [{ a: 'a' }], map: new Map(), time: new Date(), reg: /test/ig }
obj.map.set(obj, 'val')

const clone = fastClone(obj)
clone.map.get(clone) // 'val'
```

##
