import { isArray, isFunction, isMap, isObject, isPromise, isSet, isWeakMap, isWeakSet } from '../is'
import { _cloneArray, _cloneMap, _cloneSet } from './_deepCloneBase'

interface CustomCloner<T = any> {
  cloner(val: T, map: Map<any, any>): T
  judger(val: any): boolean
}
/** 深拷贝的配置项 */
type CloneOptions = {
  /** 拷贝 Symbol */
  cloneSymbol: boolean
  customCloner: CustomCloner[]
}

export function _deepClone<T>(obj: T, map: Map<any, any>, options: CloneOptions) {
  // 循环引用处理：使用 `map` 参数处理
  if (map.has(obj)) return map.get(obj)
  // 自定义拷贝逻辑
  if (options.customCloner.length) {
    for (let i = 0; i < options.customCloner.length; i++) {
      const { cloner, judger } = options.customCloner[i]
      if (judger(obj)) {
        const res = cloner(obj, map)
        map.set(obj, res)
        return res
      }
    }
  }
  // 原始类型(包括 `null`)、函数、`Promise` 处理：直接返回
  if (!isObject(obj) || isFunction(obj) || isWeakMap(obj) || isWeakSet(obj) || isPromise(obj)) return obj
  if (isArray(obj)) return _cloneArray(obj, map, _deepClone, options)
  if (isMap(obj)) return _cloneMap(obj, map, _deepClone, options)
  if (isSet(obj)) return _cloneSet(obj, map, _deepClone, options)
  // 其他情况
  let res: T
  if (obj instanceof Date) {
    // 日期
    res = new Date(obj.valueOf()) as T
    map.set(obj, res)
  } else if (obj instanceof RegExp) {
    // 正则
    res = new RegExp(obj.source, obj.flags) as T
    map.set(obj, res)
  } else {
    // 一般对象
    res = Object.create(Object.getPrototypeOf(obj)) as T & object
    map.set(obj, res)
    Reflect.ownKeys(obj).forEach((key) => {
      const val = Object.getOwnPropertyDescriptor(obj, key)
      if (!val) return
      if (val.value) val.value = _deepClone(val.value, map, options)
      Object.defineProperty(obj, key, val)
    })
  }
  return res
}
