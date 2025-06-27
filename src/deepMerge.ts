import { _, _curryMore } from './utils/_curry'
import { _deepClone } from './utils/_deepClone'
import type { MergeOption } from './utils/_deepMergeBase'
import { defaultMergeStrategy, _deepMergeBase } from './utils/_deepMergeBase'

export type { MergeOption }
export type {
  MergeStrategy,
  MergeStrategyFunction,
  BaseMargeType,
  SourceMergeType,
  TargetMergeType,
  MergeType,
  MergeTypeStrategy,
} from './utils/_deepMergeStrategy'
export { $$Empty, isMergeEmptyPlaceholder } from './utils/_deepMergeStrategy'

/**
 * 深合并, 作为基底的对象称为目标对象(target), 往之合并内容的对象称为来源对象(source)
 * - 不能处理循环引用等特殊场景
 * - 满足基本的合并功能, 以下行为是其默认行为
 *   - 普通对象、FormData 这类对象会递归合并
 *   - 数组会以拼接的方式合并
 *     - `{ a: [1, 2] }` 和 `{ a: [3, 4] }` 会合并为 `{ a: [1, 2, 3, 4] }`
 *   - Set、Map 会直接合并, 其中 Map 合并时来源对象会覆盖目标对象相同 Key 的值
 *     - Set 和 Map 视为不同类型, 会用来源对象的值覆盖
 *   - Set 和数组会互相合并
 *     - `{ a: [1, 2] }` 和 `{ a: Set([3, 4]) }` 会合并为 `{ a: [1, 2, 3, 4] }`
 *     - `{ a: Set([1, 2]) }` 和 `{ a: [3, 4] }` 会合并为 `{ a: Set([1, 2, 3, 4]) }`
 *   - 来源对象的基本类型值不会覆盖对象
 *   - 来源对象的空值(null、undefined)不会覆盖其他类型的值
 *   - 来源对象的非空值会覆盖目标对象的空值(目标对象不存在某个键时也视为空值)
 *   - 其他情况: 不同类型、原始类型、其他不能合并/拼接的值会以来源对象的为准作覆盖
 * - 可以根据类型配置不同的策略, 策略可以是 `'keep'` `'override'` `'merge'` 或者一个方法
 *   - `'keep'` 保留目标对象的值; `'override'` 保留来源对象的值
 *   - `'merge'` 特殊策略, 只对普通对象、FormData 这类对象有效
 *   - 传入方法:
 *     - 类型 `(param: { target: any; source: any; path: (string | symbol)[]; unhandledValue: any; map: Map<any, any> }) => any`
 *     - `target` 当前目标对象上这个位置的值
 *     - `source` 当前来源对象上这个位置的值
 *     - `path` 当前处理的值在对象上的位置
 *     - `map` 用于处理循环引用等情况的 Map 对象
 *     - `unhandledValue` 将这个值返回, 可以跳过处理, 交给兜底逻辑
 *     - 返回值: 合并后的对象
 *   - 合并类型: 一个字符串 `${来源对象值类型}2${目标对象值类型}`, 常见类型见下
 *     - 基本类型 `'Number'` `'String'` `'Boolean'` `'Symbol'` `'BigInt'` `'Null'` `'Undefined'`
 *     - 常见对象 `'Object'` `'Array'` `'Set'` `'Map'` `'FormData'` `'Date'` `'RegExp'` `'Promise'`
 *     - 函数 `'Function'`
 *       - 这些均视为函数 `"AsyncFunction"` `"GeneratorFunction"`, 不能拿来用
 *     - 生成器函数运行后得到生成器 `'Generator'`
 *     - 迭代器 'Iterator'
 *       - 这些均视为迭代器, 不能拿来用
 *       - `"String Iterator"` `"Array Iterator"` `"RegExp String Iterator"`
 *       - `"Map Iterator"` `"Set Iterator"` `"Segmenter String Iterator"`
 *       - `"Iterator Helper"`
 *     - 二进制流&文件 `'ArrayBuffer'` `'Buffer'` `'DataView'` `'Blob'` `'File'`
 *     - 类型数组 'TypedArray'
 *       - 这些均视为类型数组, 不能拿来用
 *       - `"Int8Array"` `"Int16Array"` `"Int32Array"`
 *       - `"Uint8Array"` `"Uint8ClampedArray"` `"Uint16Array"` `"Uint32Array"`
 *       - `"Float32Array"` `"Float64Array"`
 *       - `"BigInt64Array"` `"BigUint64Array"`
 *     - 弱引用 `'WeakSet'` `'WeakMap'` `'WeakRef'`
 *     - 报错信息 `'Error'`
 *       - 任意类型的错误视为报错信息
 *     - 其他类型 `'Any'` 表示所有类型(用于兜底), 空类型 `'Empty'` 表示目标对象上没有这个键
 *       - `'Empty'` 不会出现在来源对象上, 因此只会有 `'Any2Empty'`, 而不会有 `'Empty2Any'`
 *   - 策略优先级是:
 *     - 精确指定优先级最高: 如 `'Object2Object'` 优先于 `'Object2Any'`
 *     - 来源对象精确指定优先级高: 如 `'Object2Any'` 优先于 `'Any2Object'`
 *     - 空类型 `'Empty'` 视为精确指定
 * @param target 目标对象
 * @param source 来源对象, 往目标对象合并内容
 * @param option 配置
 * - `option.typeStrategy`: 针对不同的类型设置不同的合并方法
 * - `option.cloneOptions`: `deepMerge` 内部使用 `deepClone` 拷贝对象之类的值
 * @example
 * ```js
 * const obj1 = { arr: [1, 2], obj: { a: [1], b: { c: 2 } }, p: '1' }
 * const obj2 = { arr: [3], obj: { a: [2], b: { c: 4, d: 3 } }, p: '2' }
 * const obj3 = deepMerge(obj1, obj2)
 * obj3 // { arr: [1, 2, 3], obj: { a: [1, 2], b: { c: 4, d: 3 } }, p: '2' }
 * ```
 * @version 0.3.0
 */
export function deepMerge<Target, Source, Result = Target & Source>(
  target: Target,
  source: Source,
  option?: MergeOption
): Result {
  const typeStrategy = { ...defaultMergeStrategy, ...(option?.typeStrategy || {}) }
  const cloneOptions = {
    cloneSymbol: true,
    clonePrototype: false,
    cloneDescriptor: false,
    customCloner: [],
    ...(option?.cloneOptions || {}),
  }
  const map = new Map()
  const cloner = _curryMore(_deepClone)(_, map, cloneOptions) as <T>(obj: T) => T
  const res = _deepMergeBase(target, source, { typeStrategy, cloneOptions }, map, [], cloner)
  map.clear()
  return res as Result
}
