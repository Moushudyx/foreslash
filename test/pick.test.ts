import { pick } from '../src'

describe('pick', () => {
  it('基本功能', () => {
    const arr = [1, 2, 3]
    const sym = Symbol()
    const obj = { a: 1, b: 2, c: '', d: arr, 0: 0, [sym]: -1 }
    // 提取单个字段
    expect(pick(obj, 'a')).toEqual({ a: 1 })
    expect(pick(obj, 'd')).toEqual({ d: arr })
    expect(pick(obj, sym)).toEqual({ [sym]: -1 })
    expect(pick(obj, 0)).toEqual({ 0: 0 })
    expect(pick(obj, 'd').d).toBe(arr) // 浅拷贝
    // 提取多个字段
    expect(pick(obj, ['a'])).toEqual({ a: 1 })
    expect(pick(obj, ['a', 'd'])).toEqual({ a: 1, d: arr })
    expect(pick(obj, [sym, 0])).toEqual({ 0: 0, [sym]: -1 })
    expect(pick(obj, ['c', 'd']).d).toBe(arr) // 浅拷贝
    // 使用谓词函数
    expect(pick(obj, (value) => value === 1)).toEqual({ a: 1 })
    expect(pick(obj, (value) => value === -1)).toEqual({ [sym]: -1 })
    expect(pick(obj, (value) => typeof value !== 'number')).toEqual({ c: '', d: arr })
    expect(pick(obj, (_, key) => key === 'b')).toEqual({ b: 2 })
    expect(pick(obj, (_, key) => key === 'd').d).toBe(arr) // 浅拷贝
  })
  it('原型为 null', () => {
    const arr = [1, 2, 3]
    const sym = Symbol()
    const obj = Object.assign(Object.create(null), { a: 1, b: 2, c: '', d: arr, 0: 0, [sym]: -1 })
    // 行为不变
    expect(pick(obj, sym)).toEqual({ [sym]: -1 })
    expect(pick(obj, 0)).toEqual({ 0: 0 })
    expect(pick(obj, 'd').d).toBe(arr) // 浅拷贝
    expect(pick(obj, [sym, 0])).toEqual({ 0: 0, [sym]: -1 })
    expect(pick(obj, ['c', 'd']).d).toBe(arr) // 浅拷贝
    expect(pick(obj, (value) => typeof value !== 'number')).toEqual({ c: '', d: arr })
    expect(pick(obj, (_, key) => key === 'd').d).toBe(arr) // 浅拷贝
    // 原型为 null
    expect(Object.getPrototypeOf(pick(obj, 0))).toBe(null)
  })
})
