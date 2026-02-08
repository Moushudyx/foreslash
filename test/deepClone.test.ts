import { deepClone, fastClone, isBigInt64Array } from '../src'
import { Blob as BlobPolyfill, File as FilePloyFill } from 'node:buffer'

global.Blob = BlobPolyfill as any // jsdom 下的 Blob 行为与 Node 不一致
global.File = FilePloyFill as any // jsdom 下的 File 行为与 Node 不一致

describe('deepClone', () => {
  it('基本功能', () => {
    const key1 = Symbol('key1')
    const key2 = Symbol('key2')
    const typedArray = new BigInt64Array([BigInt(1), BigInt(2), BigInt(3)])
    const ab = new ArrayBuffer(8)
    const ab16 = new ArrayBuffer(16)
    const blob = new Blob(['123'], { type: 'text/plain' })
    const file = new File(['456'], 'test.txt', { type: 'text/plain' })
    const obj = {
      a: 1,
      b: { c: 2 },
      d: [{ e: 3 }, { f: () => 4 }] as const,
      g: /awa/i,
      h: new Set([5, 6]),
      i: new Map([[7, 8]]),
      j: new Date(),
      k: new FormData(),
      l: { l1: Object(1), l2: Object('2'), l3: Object(true) },
      m: { m1: typedArray, m2: typedArray },
      n: { n1: ab, n2: ab },
      o: { o1: new DataView(ab, 4, 4), o2: new DataView(ab, 2, 4), o3: new DataView(ab16, 2, 4) },
      p: { p1: blob, p2: blob, p3: file, p4: file },
      [key1]: Symbol('value'),
      [key2]: Object(Symbol('value')),
    }
    obj.k.append('test', '1')
    const clonedObj = deepClone(obj)
    // 保留结构
    expect(clonedObj !== obj).toBe(true)
    expect(clonedObj.a === obj.a).toBe(true)
    expect(clonedObj[key1] === obj[key1]).toBe(true)
    expect(clonedObj[key2] !== obj[key2]).toBe(true)
    expect(clonedObj.b !== obj.b).toBe(true)
    expect(clonedObj.d !== obj.d).toBe(true)
    expect(clonedObj.g !== obj.g).toBe(true)
    expect(clonedObj.h !== obj.h).toBe(true)
    expect(clonedObj.i !== obj.i).toBe(true)
    expect(clonedObj.j !== obj.j).toBe(true)
    expect(clonedObj.k !== obj.k).toBe(true)
    expect(clonedObj.l.l1 !== obj.l.l1).toBe(true)
    expect(clonedObj.l.l2 !== obj.l.l2).toBe(true)
    expect(clonedObj.l.l3 !== obj.l.l3).toBe(true)
    expect(clonedObj.m !== obj.m).toBe(true)
    expect(clonedObj.m.m1 !== obj.m.m1).toBe(true)
    expect(clonedObj.m.m1 === clonedObj.m.m2).toBe(true)
    expect(clonedObj.n !== obj.n).toBe(true)
    expect(clonedObj.n.n1 !== obj.n.n1).toBe(true)
    expect(clonedObj.n.n1 === clonedObj.n.n2).toBe(true)
    expect(clonedObj.o !== obj.o).toBe(true)
    expect(clonedObj.o.o1 !== obj.o.o1).toBe(true)
    expect(clonedObj.o.o2 !== obj.o.o2).toBe(true)
    expect(clonedObj.o.o3 !== obj.o.o3).toBe(true)
    expect(clonedObj.p.p1 !== obj.p.p1).toBe(true)
    expect(clonedObj.p.p2 !== obj.p.p2).toBe(true)
    expect(clonedObj.p.p1 === clonedObj.p.p2).toBe(true)
    expect(clonedObj.p.p3 !== obj.p.p3).toBe(true)
    expect(clonedObj.p.p4 !== obj.p.p4).toBe(true)
    expect(clonedObj.p.p3 === clonedObj.p.p4).toBe(true)
    // 内容测试
    expect(clonedObj.d[1].f()).toBe(4)
    expect(clonedObj.g.test('AWA')).toBe(true)
    expect(clonedObj.g.test('QWQ')).toBe(false)
    expect(clonedObj.h.has(5)).toBe(true)
    expect(clonedObj.h.has(4)).toBe(false)
    expect(clonedObj.i.get(7)).toBe(8)
    expect(clonedObj.j.valueOf() === obj.j.valueOf()).toBe(true)
    expect(clonedObj.k.get('test')).toBe('1')
    expect(clonedObj.l.l1.valueOf()).toBe(1)
    expect(clonedObj.l.l2.valueOf()).toBe('2')
    expect(clonedObj.l.l3.valueOf()).toBe(true)
    expect(isBigInt64Array(clonedObj.m.m1)).toBe(true)
    expect(clonedObj.m.m1[0]).toBe(BigInt(1))
    expect(clonedObj.m.m1[1]).toBe(BigInt(2))
    expect(clonedObj.m.m1[2]).toBe(BigInt(3))
    expect(clonedObj.n.n1.byteLength).toBe(8)
    expect(clonedObj[key2].valueOf() === obj[key2].valueOf()).toBe(true)
    expect(clonedObj.o.o1.byteLength === obj.o.o1.byteLength).toBe(true)
    expect(clonedObj.o.o2.byteOffset === obj.o.o2.byteOffset).toBe(true)
    expect(clonedObj.o.o3.byteOffset === obj.o.o3.byteOffset).toBe(true)
    expect(clonedObj.o.o1.buffer === clonedObj.o.o2.buffer).toBe(true) // 复制的 ArrayBuffer 是同一个
    expect(clonedObj.o.o1.buffer === clonedObj.o.o3.buffer).toBe(false)
    expect(clonedObj.p.p1.type === clonedObj.p.p2.type).toBe(true)
    expect(clonedObj.p.p3.type === obj.p.p3.type).toBe(true)
    expect(clonedObj.p.p3.name === obj.p.p3.name).toBe(true)
    expect(clonedObj.p.p3.type === clonedObj.p.p4.type).toBe(true)
    expect(clonedObj.p.p3.name === clonedObj.p.p4.name).toBe(true)
    expect(clonedObj.p.p1.text()).resolves.toBe('123')
    expect(clonedObj.p.p3.text()).resolves.toBe('456')
  })
  it('循环引用', () => {
    type TestObj = { a: number; b: { c: TestObj }; d: [TestObj]; e: Set<TestObj>; f: Map<TestObj, number> }
    const obj: TestObj = { a: 1, b: {} as TestObj['b'], d: [{}] as TestObj['d'], e: new Set(), f: new Map() }
    obj.b.c = obj
    obj.d[0] = obj
    obj.e.add(obj)
    obj.f.set(obj, 2)
    const clonedObj = deepClone(obj)
    expect(clonedObj !== obj).toBe(true)
    expect(clonedObj.a === obj.a).toBe(true)
    expect(clonedObj.b !== obj.b).toBe(true)
    expect(clonedObj.b.c !== obj.b.c).toBe(true)
    expect(clonedObj.b.c === clonedObj).toBe(true)
    expect(clonedObj.d !== obj.d).toBe(true)
    expect(clonedObj.d[0] === clonedObj).toBe(true)
    expect(clonedObj.e !== obj.e).toBe(true)
    expect(clonedObj.e.has(clonedObj)).toBe(true)
    expect(clonedObj.f !== obj.f).toBe(true)
    expect(clonedObj.f.get(clonedObj)).toBe(2)
  })
  it('拷贝 Symbol 键', () => {
    const key1 = Symbol('key1')
    const key2 = Symbol('key2')
    const obj = {
      [key1]: Symbol('value'),
      [key2]: Object(Symbol('value')),
    }
    const clonedObj1 = deepClone(obj)
    const clonedObj2 = deepClone(obj, { cloneSymbol: false })
    expect(typeof clonedObj1[key1]).toBe('symbol')
    expect(typeof clonedObj2[key1]).toBe('undefined')
    expect(typeof clonedObj1[key2].valueOf()).toBe('symbol')
    expect(typeof clonedObj2[key2]).toBe('undefined')
  })
  it('拷贝对象原型', () => {
    const proto1 = null
    const obj1 = Object.create(proto1)
    Object.assign(obj1, {
      a: 1,
      b: { c: 2 },
      d: [{ e: 3 }, { f: () => 4 }] as const,
    })
    const clonedObj1 = deepClone(obj1, { clonePrototype: true })
    expect(clonedObj1 !== obj1).toBe(true)
    expect(Object.getPrototypeOf(clonedObj1)).toBe(proto1)
    expect(clonedObj1.a === obj1.a).toBe(true)
    expect(clonedObj1.b !== obj1.b).toBe(true)
    expect(clonedObj1.d !== obj1.d).toBe(true)
    expect(clonedObj1.b.c).toBe(2)
    expect(clonedObj1.d[1].f()).toBe(4)
    const key = Symbol('key1')
    const proto2 = { p: 123 }
    const obj2 = Object.create(proto2)
    Object.assign(obj2, {
      [key]: Symbol('value'),
      b: { c: '2' },
      d: [{ e: 3 }, { f: () => '4' }] as const,
    })
    const clonedObj2 = deepClone(obj2, { clonePrototype: true })
    expect(clonedObj2 !== obj2).toBe(true)
    expect(Object.getPrototypeOf(clonedObj2)).toBe(proto2)
    expect(clonedObj2[key] === obj2[key]).toBe(true)
    expect(clonedObj2.b !== obj2.b).toBe(true)
    expect(clonedObj2.d !== obj2.d).toBe(true)
    expect(clonedObj2.b.c).toBe('2')
    expect(clonedObj2.d[1].f()).toBe('4')
  })
  it('拷贝属性的 Descriptor', () => {
    const obj = {
      get a() {
        return 1
      },
      b: 2,
      get c() {
        return 3
      },
      set c(val) {
        this.d = val
      },
      d: 4,
    }
    const clonedObj1 = deepClone(obj)
    const clonedObj2 = deepClone(obj, { cloneDescriptor: true })
    expect(clonedObj1.a).toBe(1)
    expect(clonedObj1.b).toBe(2)
    expect(clonedObj1.c).toBe(3)
    clonedObj1.c = 5
    expect(clonedObj1.c).toBe(5)
    expect(clonedObj2.d).toBe(4)
    expect(typeof Object.getOwnPropertyDescriptor(clonedObj1, 'a')!.get).toBe('undefined')
    expect(typeof Object.getOwnPropertyDescriptor(clonedObj1, 'b')!.get).toBe('undefined')
    expect(typeof Object.getOwnPropertyDescriptor(clonedObj1, 'c')!.get).toBe('undefined')
    expect(clonedObj2.a).toBe(1)
    expect(clonedObj2.b).toBe(2)
    expect(clonedObj2.c).toBe(3)
    clonedObj2.c = 5
    expect(clonedObj2.c).toBe(3)
    expect(clonedObj2.d).toBe(5)
    expect(typeof Object.getOwnPropertyDescriptor(clonedObj2, 'a')!.get).toBe('function')
    expect(typeof Object.getOwnPropertyDescriptor(clonedObj2, 'b')!.get).toBe('undefined')
    expect(typeof Object.getOwnPropertyDescriptor(clonedObj2, 'c')!.get).toBe('function')
  })
  it('自定义拷贝逻辑', () => {
    const cloner1 = vi.fn((d: Date) => new Date(d))
    const cloner2 = vi.fn(fastClone)
    const judger1 = vi.fn((obj) => obj instanceof Date)
    const judger2 = vi.fn((obj) => obj instanceof Error)
    const customCloner = [
      {
        cloner: cloner1,
        judger: judger1,
      },
      {
        cloner: cloner2,
        judger: judger2,
      },
    ]
    const clonedObj1 = deepClone({ a: 1, b: 2 }, { customCloner })
    expect(clonedObj1).toEqual({ a: 1, b: 2 })
    expect(cloner1).not.toHaveBeenCalled() // 不是 Date 不调用 cloner1
    expect(cloner2).not.toHaveBeenCalled() // 不是 Error 不调用 cloner2
    expect(judger1).toHaveBeenCalled()
    expect(judger2).toHaveBeenCalled()
    const obj2 = { a: 1, b: new Date(), c: new Date() }
    obj2.c = obj2.b
    const clonedObj2 = deepClone(obj2, { customCloner })
    expect(clonedObj2).toEqual(obj2)
    expect(clonedObj2.c.valueOf() === obj2.b.valueOf()).toBe(true)
    expect(clonedObj2.c === clonedObj2.b).toBe(true) // cloner 复制的值也受 map 的影响
    expect(clonedObj2.c === obj2.c).toBe(false)
    expect(cloner1).toHaveBeenCalled() // Date 被 cloner1 处理
    expect(cloner2).not.toHaveBeenCalled() // 没有 Error 不调用 cloner2
    expect(judger1).toHaveBeenCalled()
    expect(judger2).toHaveBeenCalled()
  })
})
