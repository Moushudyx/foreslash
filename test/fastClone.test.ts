import { fastClone } from '../src'

describe('fastClone', () => {
  it('基本功能', () => {
    const obj = {
      a: 1,
      b: { c: 2 },
      d: [{ e: 3 }, { f: () => 4 }] as const,
      g: /awa/i,
      h: new Set([5, 6]),
      i: new Map([[7, 8]]),
      j: new Date(),
    }
    const clonedObj = fastClone(obj)
    expect(clonedObj !== obj).toBe(true)
    expect(clonedObj.a === obj.a).toBe(true)
    expect(clonedObj.b !== obj.b).toBe(true)
    expect(clonedObj.d !== obj.d).toBe(true)
    expect(clonedObj.g !== obj.g).toBe(true)
    expect(clonedObj.h !== obj.h).toBe(true)
    expect(clonedObj.i !== obj.i).toBe(true)
    expect(clonedObj.j !== obj.j).toBe(true)
    expect(clonedObj.d[1].f()).toBe(4)
    expect(clonedObj.g.test('AWA')).toBe(true)
    expect(clonedObj.g.test('QWQ')).toBe(false)
    expect(clonedObj.h.has(5)).toBe(true)
    expect(clonedObj.h.has(4)).toBe(false)
    expect(clonedObj.i.get(7)).toBe(8)
    expect(clonedObj.j.valueOf() === obj.j.valueOf()).toBe(true)
  })
  it('循环引用', () => {
    type TestObj = { a: number; b: { c: TestObj }; d: [TestObj]; e: Set<TestObj>; f: Map<TestObj, number> }
    const obj: TestObj = { a: 1, b: {} as TestObj['b'], d: [{}] as TestObj['d'], e: new Set(), f: new Map() }
    obj.b.c = obj
    obj.d[0] = obj
    obj.e.add(obj)
    obj.f.set(obj, 2)
    const clonedObj = fastClone(obj)
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
})
