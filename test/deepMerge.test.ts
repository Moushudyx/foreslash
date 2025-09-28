import { deepMerge } from '../src'

describe('deepMerge', () => {
  it('基本功能', () => {
    const formData = new FormData()
    formData.append('a', '1')
    formData.append('b', '2')
    const obj1 = { arr: [1, 2], a: { b: { c: [1], d: '1', e: 1 } }, g: {}, h: new FormData() }
    const obj2 = { arr: [3], a: { b: { c: [2], d: '2', f: 2 } }, g: formData, h: { a: 1, b: 2 } }
    const mergeObj1 = deepMerge(obj1, obj2)
    expect(mergeObj1.arr).toEqual([1, 2, 3])
    expect(mergeObj1.a).toEqual({ b: { c: [1, 2], d: '2', e: 1, f: 2 } })
    expect(mergeObj1.g).toEqual({ a: '1', b: '2' })
    expect(mergeObj1.h.get('a')).toBe('1')
    expect(mergeObj1.h.get('b')).toBe('2')

    const formData2 = new FormData()
    formData2.append('a', '3')
    formData2.append('b', '4')
    const formData3 = new FormData()
    formData3.append('a', '0')
    formData3.append('c', '0')
    const set1 = new Set([1, 2, 3])
    const set2 = new Set([2, 3, 4])
    const set3 = new Set([3, 4])
    const set4 = new Set([3, 4])
    const map1 = new Map([
      [1, 1],
      [2, 2],
      [3, 3],
    ])
    const map2 = new Map([
      [1, 2],
      [2, 4],
      [4, 8],
    ])
    const obj3 = { a: set1, b: map1, c: [1, 2], d: set4, e: formData3 }
    const obj4 = { a: set2, b: map2, c: set3, d: [1, 2], e: formData2 }
    const mergeObj2 = deepMerge(obj3, obj4)
    expect(mergeObj2.a.has(1)).toBe(true)
    expect(mergeObj2.a.has(2)).toBe(true)
    expect(mergeObj2.a.has(3)).toBe(true)
    expect(mergeObj2.a.has(4)).toBe(true)
    expect(mergeObj2.b.get(1)).toBe(2)
    expect(mergeObj2.b.get(2)).toBe(4)
    expect(mergeObj2.b.get(3)).toBe(3)
    expect(mergeObj2.c).toEqual([1, 2, 3, 4])
    expect(mergeObj2.d.has(1)).toBe(true)
    expect(mergeObj2.d.has(2)).toBe(true)
    expect(mergeObj2.d.has(3)).toBe(true)
    expect(mergeObj2.d.has(4)).toBe(true)
    expect(mergeObj2.e.get('a')).toBe('3')
    expect(mergeObj2.e.get('b')).toBe('4')
    expect(mergeObj2.e.get('c')).toBe('0')
  })
  it('特殊对象识别', () => {
    const fn = () => {}
    const asyncFn = async () => {}
    const genFn = function* () {}
    const typedArray = new BigInt64Array([BigInt(1), BigInt(2), BigInt(3)])
    const ab = new ArrayBuffer(8)
    const dataView = new DataView(ab, 4, 4)
    const blob = new Blob(['123'], { type: 'text/plain' })
    const file = new File(['456'], 'test.txt', { type: 'text/plain' })

    const obj1 = { a: 1, b: 2, c: '3', d: false, e: 4, f: 5, g: 6, h: 7, i: 8 }
    const obj2 = { a: fn, b: asyncFn, c: genFn, d: genFn, e: typedArray, f: ab, g: blob, h: file, i: dataView }
    const mergeObj1 = deepMerge(obj1, obj2, {
      typeStrategy: {
        Function2Number: 'keep',
        Function2String: 'keep',
        Function2Boolean: 'override',
        TypedArray2Number: 'keep',
        ArrayBuffer2Number: 'keep',
        Blob2Number: 'keep',
        File2Number: 'keep',
        DataView2Number: 'keep',
      },
    })
    expect(mergeObj1.a).toBe(1)
    expect(mergeObj1.b).toBe(2)
    expect(mergeObj1.c).toBe('3')
    expect(mergeObj1.d).toBe(genFn)
    expect(mergeObj1.e).toBe(4)
    expect(mergeObj1.f).toBe(5)
    expect(mergeObj1.g).toBe(6)
    expect(mergeObj1.h).toBe(7)
    expect(mergeObj1.i).toBe(8)
  })
  it('空值识别', () => {
    const file = new File(['456'], 'test.txt', { type: 'text/plain' })
    const formData1 = new FormData()
    formData1.append('h', '1')
    const formData2 = new FormData()
    formData2.append('j', '2')
    formData2.append('k', '3')
    const obj1 = { a: {}, d: formData1, i: { j: '1' } }
    const obj2 = { a: { b: 1, c: 2 }, d: { e: '1', f: '2', g: file, h: '3' }, i: formData2 }
    const mergeObj1 = deepMerge(obj1, obj2, {
      typeStrategy: {
        Number2Empty: 'keep',
        String2Empty: 'keep',
      },
    })
    expect(mergeObj1.a.b).toBe(undefined)
    expect(mergeObj1.a.c).toBe(undefined)
    expect(mergeObj1.d.has('e')).toBe(false)
    expect(mergeObj1.d.has('f')).toBe(false)
    expect(mergeObj1.d.get('g')).toEqual(file)
    expect(mergeObj1.d.get('h')).toBe('3')
    expect(mergeObj1.i.j).toBe('2')
    expect('k' in mergeObj1.i).toBe(false)
  })
  it('自定义合并策略', () => {
    const obj1 = { a: { b: '1', c: 3 }, d: { e: '5', f: 6 } }
    const obj2 = { a: { b: '2', c: 2 }, d: { e: '3', f: 4 } }
    const mergeObj = deepMerge(obj1, obj2, {
      typeStrategy: {
        Number2Number: ({ target, source }) => target + source,
        String2String: ({ target, source }) => target + source,
      },
    })
    expect(mergeObj).toEqual({ a: { b: '12', c: 5 }, d: { e: '53', f: 10 } })
  })
  it('合并策略识别有误时兜底使用覆盖', () => {
    const iterator = String(1)[Symbol.iterator]
    const obj1 = { a: { awa: 'qwq' }, d: iterator, e: new Error('1') }
    const obj2 = { a: { b: 1, c: '2' }, d: new Error('2'), e: iterator }
    const mergeObj1 = deepMerge(obj1, obj2, {
      typeStrategy: {
        Number2Empty: 'keep',
        // @ts-ignore
        String2Empty: '111',
        Any2Any: undefined, // 去掉兜底
        Iterator2Any: 'override',
      },
    })
    expect(mergeObj1.a.awa).toBe('qwq')
    expect(mergeObj1.a.b).toBe(undefined)
    expect(mergeObj1.a.c).toBe('2')
    expect(mergeObj1.d.message).toBe('2') // 去掉兜底之后, 仍然有一个 override 策略兜底
    expect(mergeObj1.e).toBe(String(1)[Symbol.iterator])
  })
})
