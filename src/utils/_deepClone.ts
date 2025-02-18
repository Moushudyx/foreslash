import {
  isArray,
  isFormData,
  isFunction,
  isMap,
  isObject,
  isPromise,
  isSet,
  isTypedArray,
  isWeakMap,
  isWeakSet,
  isWrapperObject,
} from '../is'
import { _cloneArray, _cloneArrayBuffer, _cloneFormData, _cloneMap, _cloneSet } from './_deepCloneBase'

export interface CustomCloner<T = any> {
  cloner(val: T, map: Map<any, any>): T
  judger(val: any): boolean
}
/** 深拷贝的配置项 */
export type CloneOptions = {
  /** 拷贝 Symbol 键 默认为 true */
  cloneSymbol: boolean
  /** 拷贝对象原型 默认为 false */
  clonePrototype: boolean
  /** 拷贝属性的 Descriptor 默认为 false */
  cloneDescriptor: boolean
  /** 自定义拷贝逻辑 默认为空 */
  customCloner: CustomCloner[]
}

export function _deepClone<T>(obj: T, map: Map<any, any>, options: CloneOptions): T {
  // 循环引用处理：使用 `map` 参数处理
  if (map.has(obj)) return map.get(obj)
  // [配置项] 自定义拷贝逻辑
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
  if (isFormData(obj)) return _cloneFormData(obj, map, _deepClone, options)
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
  } else if (obj instanceof ArrayBuffer) {
    // ArrayBuffer
    res = _cloneArrayBuffer(obj, map)
    // map.set(obj, res) // _cloneArrayBuffer 内部有处理
  } else if (isTypedArray(obj)) {
    // TypedArray
    res = new (obj.constructor as any)(_cloneArrayBuffer(obj.buffer, map), obj.byteOffset, obj.length)
    map.set(obj, res)
  } else if (obj instanceof DataView) {
    // DataView
    res = new DataView(
      map.has(obj.buffer) ? map.get(obj.buffer) : _cloneArrayBuffer(obj.buffer, map),
      obj.byteOffset,
      obj.byteLength
    ) as T & DataView
    map.set(obj, res)
  } else if (isWrapperObject(obj)) {
    res = Object(obj.valueOf())
    map.set(obj, res)
  } else {
    // 一般对象
    // [配置项] 拷贝对象原型
    res = options.clonePrototype ? (Object.create(Object.getPrototypeOf(obj)) as T & object) : ({} as T & object)
    map.set(obj, res)
    Reflect.ownKeys(obj).forEach((key) => {
      if (!options.cloneSymbol && typeof key === 'symbol') return // [配置项] 拷贝 Symbol 键
      // [配置项] 拷贝属性的 Descriptor
      if (options.cloneDescriptor) {
        const val = Object.getOwnPropertyDescriptor(obj, key)
        if (!val) return
        if (val.value) val.value = _deepClone(val.value, map, options)
        Object.defineProperty(res, key, val)
      } else {
        Reflect.set(res as T & object, key, _deepClone(Reflect.get(obj, key), map, options))
      }
    })
  }
  return res
}
