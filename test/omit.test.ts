import { omit } from '../src'

describe('pick', () => {
  it('基本功能', () => {
    const arr = [1, 2, 3]
    const sym = Symbol()
    const obj = { a: 1, b: 2, c: '', d: arr, 0: 0, [sym]: -1 }
    // 提取单个字段
    expect(omit(obj, 'a')).toEqual({ b: 2, c: '', d: arr, 0: 0, [sym]: -1 })
    expect(omit(obj, 'd')).toEqual({ a: 1, b: 2, c: '', 0: 0, [sym]: -1 })
    expect(omit(obj, sym)).toEqual({ a: 1, b: 2, c: '', d: arr, 0: 0 })
    expect(omit(obj, 0)).toEqual({ a: 1, b: 2, c: '', d: arr, [sym]: -1 })
    expect(omit(obj, 'c').d).toBe(arr) // 浅拷贝
    // 提取多个字段
    expect(omit(obj, ['b', 'c', 'd'])).toEqual({ a: 1, 0: 0, [sym]: -1 })
    expect(omit(obj, ['a', 'd'])).toEqual({ b: 2, c: '', 0: 0, [sym]: -1 })
    expect(omit(obj, [sym, 0])).toEqual({ a: 1, b: 2, c: '', d: arr })
    expect(omit(obj, ['c', 0]).d).toBe(arr) // 浅拷贝
    // 使用谓词函数
    expect(omit(obj, (value) => value !== 1)).toEqual({ a: 1 })
    expect(omit(obj, (value) => value !== -1)).toEqual({ [sym]: -1 })
    expect(omit(obj, (value) => typeof value === 'number')).toEqual({ c: '', d: arr })
    expect(omit(obj, (_, key) => key !== 'b')).toEqual({ b: 2 })
    expect(omit(obj, (_, key) => key !== 'd').d).toBe(arr) // 浅拷贝
  })
    it('原型为 null', () => {
      const arr = [1, 2, 3]
      const sym = Symbol()
      const obj = Object.assign(Object.create(null), { a: 1, b: 2, c: '', d: arr, 0: 0, [sym]: -1 })
      // 行为不变
    expect(omit(obj, sym)).toEqual({ a: 1, b: 2, c: '', d: arr, 0: 0 })
    expect(omit(obj, 0)).toEqual({ a: 1, b: 2, c: '', d: arr, [sym]: -1 })
    expect(omit(obj, 'c').d).toBe(arr) // 浅拷贝
    expect(omit(obj, [sym, 0])).toEqual({ a: 1, b: 2, c: '', d: arr })
    expect(omit(obj, ['c', 0]).d).toBe(arr) // 浅拷贝
    expect(omit(obj, (value) => typeof value === 'number')).toEqual({ c: '', d: arr })
    expect(omit(obj, (_, key) => key !== 'd').d).toBe(arr) // 浅拷贝
      // 原型为 null
      expect(Object.getPrototypeOf(omit(obj, 0))).toBe(null)
    })
})
