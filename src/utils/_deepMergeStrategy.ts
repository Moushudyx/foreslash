import type { A } from 'ts-toolbelt'
import { getTag } from './_getTag'

/**
 * 合并策略, 可以是 `'keep'` `'override'` `'merge'` 或者一个方法
 * - `'keep'` 表示保留原值
 * - `'override'` 表示覆盖为新值
 * - 如果是自定义合并方法, 那么你的方法接收的第一个参数是需要合并的值以及其路径
 *   - `{ target: 原值; source: 新值; path: 路径数组; unhandledValue: 如果无法处理则返回这个 }`
 */
export type MergeStrategy = 'keep' | 'override' | MergeStrategyFunction
export type MergeStrategyFunction<T = any, S = any, Res = any> = (param: {
  target: T
  source: S
  path: (string | symbol)[]
  unhandledValue: any
  map: Map<any, any>
  typeStrategy: MergeTypeStrategy
  /** 深拷贝, 直接传值即可, 参数已经预设好了 */
  cloner: <T>(obj: T) => T
  /** 深合并, 直接传值即可, 参数已经预设好了 */
  merger: (target: any, source: any, path: (string | symbol)[]) => any
}) => Res
/** 所有内部识别的值类型 */
export type BaseMargeType =
  // 基本类型
  | 'Number'
  | 'String'
  | 'Boolean'
  | 'Symbol'
  | 'BigInt'
  | 'Null'
  | 'Undefined'
  // 常见对象
  | 'Object' // 合并
  | 'Array' // 拼接
  | 'Set' // 合并
  | 'Map' // 合并
  | 'FormData' // 合并
  | 'Date'
  | 'RegExp'
  | 'Promise'
  // 函数
  // 注: 这些均视为函数
  // "AsyncFunction" "GeneratorFunction"
  | 'Function'
  // 特殊对象 生成器函数运行后得到生成器
  | 'Generator'
  // 特殊对象 迭代器
  // 注: 这些均视为迭代器
  // "String Iterator" "Array Iterator" "RegExp String Iterator"
  // "Map Iterator" "Set Iterator" "Segmenter String Iterator"
  // 还有一个 "Iterator Helper"
  | 'Iterator'
  // 特殊对象 二进制流&文件
  | 'ArrayBuffer'
  | 'Buffer' // 仅 NodeJS
  | 'DataView'
  | 'Blob'
  | 'File'
  // 特殊对象 类型数组
  // 注: 这些均视为类型数组
  // "Int8Array" "Int16Array" "Int32Array"
  // "Uint8Array" "Uint8ClampedArray" "Uint16Array" "Uint32Array"
  // "Float32Array" "Float64Array"
  // "BigInt64Array" "BigUint64Array"
  | 'TypedArray'
  // 特殊对象 弱引用
  | 'WeakSet'
  | 'WeakMap'
  | 'WeakRef'
  // 特殊对象 报错信息
  // 注: 任意类型的错误均视为报错信息
  | 'Error'
/** 来源对象上的值类型, 不会有 `'Empty'` */
export type SourceMergeType = BaseMargeType | 'Any'
/** 目标对象上的值类型, 如果某个字段目标上没有而来源上有, 那么就为 `"Empty"` */
export type TargetMergeType = BaseMargeType | 'Empty' | 'Any'
/** 合并类型, 其中来源对象上不会有 `'Empty'` */
export type MergeType = `${SourceMergeType}2${TargetMergeType}`
/** 根据目标对象类型和来源对象类型获取合并策略 */
export type MergeTypeStrategy = {
  [mergeType in MergeType]?: MergeStrategy
}

export type MergeEmptyPlaceholder = A.x & { '@@merge/placeholder': true }
/** `deepMerge` 深合并的空值占位符 */
export const $$Empty = Object.freeze({ '@@merge/placeholder': true })

export function getMergeStrategy(
  targetType: BaseMargeType | 'Empty',
  sourceType: BaseMargeType,
  strategy: MergeTypeStrategy
): MergeStrategy {
  return (
    strategy[`${sourceType}2${targetType}`] || // 精确指定优先级最高 空类型视为精确指定
    strategy[`${sourceType}2Any`] || // 来源对象精确指定优先级高
    strategy[`Any2${targetType}`] ||
    strategy[`Any2Any`] || // 兜底
    'override' // 确保 typescript 不报错
  )
}
/** 根据传入的值, 返回能够内部识别的值类型 */
export function getBaseMargeType(obj: any): BaseMargeType | 'Empty' {
  if (isMergeEmptyPlaceholder(obj)) return 'Empty'
  const _tag = getTag(obj)
  if (/Function/.test(_tag)) return 'Function'
  if (/Iterator/.test(_tag)) return 'Iterator'
  if (/(?:8|16|32|64)Array/.test(_tag)) return 'TypedArray'
  if (/Error/.test(_tag)) return 'Error'
  return _tag as BaseMargeType
}
/**
 * 判断给定的参数是否为 `deepMerge` 深合并的空值占位符
 * @param arg 需要判定的参数
 * @returns 是否为空值占位符
 */
export function isMergeEmptyPlaceholder(arg: any): arg is MergeEmptyPlaceholder {
  return typeof arg === 'object' && Boolean(arg) && arg['@@merge/placeholder'] === true
}
