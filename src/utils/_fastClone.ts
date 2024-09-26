import { isArray, isFunction, isMap, isObject, isPromise, isSet, isWeakMap, isWeakSet } from '../is'
import { _cloneArray, _cloneMap, _cloneSet } from './_deepCloneBase'
/**
 * 快速深拷贝内部实现
 * - 不考虑各种杂七杂八的实现
 * - 循环引用处理：使用 `map` 参数处理
 * - 原始类型(包括 `null`)、函数、`Promise` 处理：直接返回
 * @param obj 需要深拷贝的数据
 * @param map 缓存对象，用于处理循环引用
 */
export function _fastClone<T>(obj: T, map: Map<any, any>): T {
  // 循环引用处理：使用 `map` 参数处理
  if (map.has(obj)) return map.get(obj)
  // 原始类型(包括 `null`)、函数、`Promise` 处理：直接返回
  if (!isObject(obj) || isFunction(obj) || isWeakMap(obj) || isWeakSet(obj) || isPromise(obj)) return obj
  if (isArray(obj)) return _cloneArray(obj, map, _fastClone)
  if (isMap(obj)) return _cloneMap(obj, map, _fastClone)
  if (isSet(obj)) return _cloneSet(obj, map, _fastClone)
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
    res = {} as T & object
    map.set(obj, res)
    ;(Object.keys(obj) as Array<keyof (T & object)>).forEach((key) => {
      res[key] = _fastClone(obj[key], map)
    })
  }
  return res
}
