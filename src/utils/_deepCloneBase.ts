type CloneFn = <T>(obj: T, map: Map<any, any>, ...args: any[]) => T
/**
 * 深拷贝数组内部实现
 * @param obj 要拷贝的数组
 * @param map 缓存对象，用于处理循环引用
 * @param cloner 深拷贝方法
 * @param args 深拷贝方法的其他参数
 */
export function _cloneArray<T extends Array<any>>(obj: T, map: Map<any, any>, cloner: CloneFn, ...args: any[]): T {
  const res = obj.slice() as T
  map.set(obj, res)
  // 使用经典 for 循环以避免 for...of 或者 forEach 调用迭代器的开销
  for (let index = 0; index < obj.length; index++) {
    res[index] = cloner(obj[index], map, ...args);
  }
  return res
}
/**
 * 深拷贝 `Map` 内部实现
 * @param obj 要拷贝的 `Map`
 * @param map 缓存对象，用于处理循环引用
 * @param cloner 深拷贝方法
 * @param args 深拷贝方法的其他参数
 */
export function _cloneMap<T extends Map<any, any>>(obj: T, map: Map<any, any>, cloner: CloneFn, ...args: any[]): T {
  const res = new Map() as T
  map.set(obj, res)
  // 使用 forEach 遍历以避免旧版运行环境使用 polyfill 的 Map 时 for...of 不生效的问题
  obj.forEach((value, key) => {
    res.set(cloner(key, map, ...args), cloner(value, map, ...args))
  })
  return res
}
/**
 * 深拷贝 `Set` 内部实现
 * @param obj 要拷贝的 `Set`
 * @param map 缓存对象，用于处理循环引用
 * @param cloner 深拷贝方法
 * @param args 深拷贝方法的其他参数
 */
export function _cloneSet<T extends Set<any>>(obj: T, map: Map<any, any>, cloner: CloneFn, ...args: any[]): T {
  const res = new Set() as T
  map.set(obj, res)
  // 使用 forEach 遍历以避免旧版运行环境使用 polyfill 的 Set 时 for...of 不生效的问题
  obj.forEach((item) => res.add(cloner(item, map, ...args)))
  return res
}
/**
 * 深拷贝 `FormData` 内部实现
 * @param obj 要拷贝的 `FormData`
 * @param map 缓存对象，用于处理循环引用
 * @param cloner 深拷贝方法
 * @param args 深拷贝方法的其他参数
 */
export function _cloneFormData<T extends FormData>(obj: T, map: Map<any, any>, cloner: CloneFn, ...args: any[]): T {
  const res = new FormData() as T
  map.set(obj, res)
  obj.forEach((value, key) => {
    res.append(key, cloner(value, map, ...args))
  })
  return res
}
/**
 * 深拷贝 `ArrayBuffer` 内部实现
 * @param obj 要拷贝的 `ArrayBuffer`
 * @param map 缓存对象，用于处理循环引用
 */
export function _cloneArrayBuffer<T extends ArrayBuffer>(obj: T, map: Map<any, any>): T {
  const res = new ArrayBuffer(obj.byteLength) as T
  map.set(obj, res)
  new Uint8Array(res).set(new Uint8Array(obj))
  return res
}
/**
 * 深拷贝 `Blob` 内部实现
 * @param obj 要拷贝的 `Blob`
 * @param map 缓存对象，用于处理循环引用
 */
export function _cloneBlob<T extends Blob>(obj: T, map: Map<any, any>): T {
  const res = obj.slice(0, obj.size, obj.type) as T;
  map.set(obj, res)
  return res
}
/**
 * 深拷贝 `File` 内部实现
 * @param obj 要拷贝的 `File`
 * @param map 缓存对象，用于处理循环引用
 */
export function _cloneFile<T extends File>(obj: T, map: Map<any, any>): T {
  const res = new File([obj], obj.name, { type: obj.type, lastModified: obj.lastModified }) as T
  map.set(obj, res)
  return res
}
