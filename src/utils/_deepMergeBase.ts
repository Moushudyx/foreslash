import { isFunction, isSymbol } from '../is'
import { _, _curryMore } from './_curry'
import { _deepClone, type CloneOptions } from './_deepClone'
import { getBaseMargeType, getMergeStrategy, $$Empty, isMergeEmptyPlaceholder } from './_deepMergeStrategy'
import type { MergeStrategyFunction, MergeTypeStrategy, BaseMargeType } from './_deepMergeStrategy'
/** `deepMerge` 深合并方法的配置参数 */
export type MergeOption = {
  /** 针对不同的类型设置不同的合并方法 */
  typeStrategy?: Partial<MergeTypeStrategy>
  /** `deepMerge` 内部使用 `deepClone` 拷贝对象之类的值 */
  cloneOptions?: CloneOptions
}

export function _deepMergeBase<Target, Source, Result = Target & Source>(
  target: Target,
  source: Source,
  option: Required<MergeOption>,
  map: Map<any, any>,
  path: (string | symbol)[],
  cloner: <T>(obj: T) => T
): Result {
  const targetType = getBaseMargeType(target)
  const sourceType = getBaseMargeType(source) as BaseMargeType
  const strategy = getMergeStrategy(targetType, sourceType, option.typeStrategy)
  // const cloner = _curryMore(_deepClone)(_, map, option.cloneOptions) as <T>(obj: T) => T
  // 自定义合并方法
  if (isFunction(strategy)) {
    const merger = _curryMore(_deepMergeBase)(_, _, option, map, _, cloner)
    const mergeRes = strategy({
      target,
      source,
      cloner,
      merger,
      path,
      typeStrategy: option.typeStrategy,
      unhandledValue: $$Empty,
      map,
    })
    if (!isMergeEmptyPlaceholder(mergeRes)) return mergeRes as unknown as Result
  }
  // 预设合并方法
  if (strategy === 'keep') {
    if (isMergeEmptyPlaceholder(target)) return $$Empty as unknown as Result
    return cloner(target) as unknown as Result
  } else if (strategy === 'override') {
    return cloner(source) as unknown as Result
  } else {
    // 理论上代码永远不会走到这里, 这行代码只是为了避免 typescript 报错
    return cloner(source) as unknown as Result
  }
}

export const defaultMergeStrategy: MergeTypeStrategy = {
  // 其他情况: 不同类型、原始类型、其他不能合并/拼接的值会以来源对象的为准作覆盖
  Any2Any: 'override',
  // 来源对象的非空值会覆盖目标对象的空值(目标对象不存在某个键时也视为空值)
  Any2Empty: 'override',
  Any2Null: 'override',
  Any2Undefined: 'override',
  // 来源对象的空值(null、undefined)不会覆盖其他类型的值
  Null2Any: 'keep',
  Undefined2Any: 'keep',
  Null2Empty: 'override',
  Undefined2Empty: 'override',
  // 来源对象的基本类型值不会覆盖对象
  Number2Any: 'keep',
  Number2Number: 'override',
  String2Any: 'keep',
  String2String: 'override',
  Boolean2Any: 'keep',
  Boolean2Boolean: 'override',
  Symbol2Any: 'keep',
  Symbol2Symbol: 'override',
  BigInt2Any: 'keep',
  BigInt2BigInt: 'override',
  // 来源对象的基本类型值会覆盖空值
  Number2Empty: 'override',
  String2Empty: 'override',
  Boolean2Empty: 'override',
  Symbol2Empty: 'override',
  BigInt2Empty: 'override',
  Number2Null: 'override',
  String2Null: 'override',
  Boolean2Null: 'override',
  Symbol2Null: 'override',
  BigInt2Null: 'override',
  Number2Undefined: 'override',
  String2Undefined: 'override',
  Boolean2Undefined: 'override',
  Symbol2Undefined: 'override',
  BigInt2Undefined: 'override',
  // 普通对象、FormData 这类对象会递归合并
  Object2Object: (({ target, source, cloner, path, merger }) => {
    const res = cloner(target)
    Reflect.ownKeys(source).forEach((key) => {
      const newPath = [...path, key]
      if (key in res) {
        res[key] = merger(res[key], source[key], newPath)
      } else {
        const mergeRes = merger($$Empty, source[key], newPath)
        if (!isMergeEmptyPlaceholder(mergeRes)) res[key] = mergeRes
      }
    })
    return res
  }) as MergeStrategyFunction<any, any, any>,
  Object2FormData: (({ target, source, cloner, path, merger }) => {
    const res = cloner(target)
    Reflect.ownKeys(source).forEach((key) => {
      if (isSymbol(key)) return // 忽略 symbol 键
      const newPath = [...path, key]
      if (res.has(key)) {
        res.set(key, merger(res.get(key), source[key], newPath))
      } else {
        const mergeRes = merger($$Empty, source[key], newPath)
        if (!isMergeEmptyPlaceholder(mergeRes)) res.set(key, mergeRes)
      }
    })
    return res
  }) as MergeStrategyFunction<FormData, any, FormData>,
  FormData2Object: (({ target, source, cloner, path, merger }) => {
    const res = cloner(target)
    source.forEach((val, key) => {
      const newPath = [...path, key]
      if (key in res) {
        res[key] = merger(res[key], val, newPath)
      } else {
        const mergeRes = merger($$Empty, val, newPath)
        if (!isMergeEmptyPlaceholder(mergeRes)) res[key] = mergeRes
      }
    })
    return res
  }) as MergeStrategyFunction<any, FormData, any>,
  FormData2FormData: (({ target, source, cloner, path, merger }) => {
    const res = cloner(target)
    source.forEach((val, key) => {
      const newPath = [...path, key]
      if (res.has(key)) {
        res.set(key, merger(res.get(key), val, newPath))
      } else {
        const mergeRes = merger($$Empty, val, newPath)
        if (!isMergeEmptyPlaceholder(mergeRes)) res.set(key, mergeRes)
      }
    })
    return res
  }) as MergeStrategyFunction<FormData, FormData, FormData>,
  // Set 直接合并
  Set2Set: (({ target, source, cloner }) => {
    const res = cloner(target)
    for (const item of source) res.add(cloner(item))
    return res
  }) as MergeStrategyFunction<Set<any>, Set<any>, Set<any>>,
  // Map 会直接合并, 来源对象会覆盖目标对象相同 Key 的值
  Map2Map: (({ target, source, cloner }) => {
    const res = cloner(target)
    for (const [key, val] of source) res.set(cloner(key), cloner(val))
    return res
  }) as MergeStrategyFunction<Map<any, any>, Map<any, any>, Map<any, any>>,
  // 数组会以拼接的方式合并
  Array2Array: (({ target, source, cloner }) => {
    const res = cloner(target)
    for (const item of source) res.push(cloner(item))
    return res
  }) as MergeStrategyFunction<Array<any>, Array<any>, Array<any>>,
  // Set 和数组会互相合并
  Set2Array: (({ target, source, cloner }) => {
    const res = cloner(target)
    for (const item of source) res.push(cloner(item))
    return res
  }) as MergeStrategyFunction<Array<any>, Set<any>, Array<any>>,
  Array2Set: (({ target, source, cloner }) => {
    const res = cloner(target)
    for (const item of source) res.add(cloner(item))
    return res
  }) as MergeStrategyFunction<Set<any>, Array<any>, Set<any>>,
}
