import { _, isPlaceholder, curry } from '../src/index'

describe('isPlaceholder', () => {
  it('基本测试', () => {
    expect(isPlaceholder(_)).toBe(true)
    expect(isPlaceholder({})).toBe(false)
    expect(isPlaceholder([])).toBe(false)
    expect(isPlaceholder(null)).toBe(false)
    expect(isPlaceholder(1234)).toBe(false)
  })
})
describe('curry', () => {
  const testFn0 = function () {
    return 'testFn0'
  }
  const testFn1 = function (a: number) {
    return `a: ${a}`
  }
  const testFn2 = function (a: number, b: number) {
    return `a: ${a}, b: ${b}`
  }
  const testFn3 = function (a: number, b: number, c: number) {
    return `a: ${a}, b: ${b}, c: ${c}`
  }
  const testFn5 = function (a: number, b: number, c: number, d: number, e: number) {
    return `a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}`
  }
  const testFn12 = function (
    a: number,
    b: boolean,
    c: string,
    d: number,
    e: boolean,
    f: string,
    g: number,
    h: boolean,
    i: string,
    j: number,
    k: boolean,
    l: string
  ) {
    return `a: ${a}, b: ${b}, c: ${c}, d: ${d}, e: ${e}, f: ${f}, g: ${g}, h: ${h}, i: ${i}, j: ${j}, k: ${k}, l: ${l}`
  }
  it('基本测试', () => {
    expect(typeof curry(testFn0)).toBe('function')
    expect(curry(testFn0)()).toBe(testFn0())
    expect(typeof curry(testFn1)).toBe('function')
    expect(curry(testFn1)(1)).toBe(testFn1(1))
    expect(typeof curry(testFn2)).toBe('function')
    expect(curry(testFn2)(1)(2)).toBe(testFn2(1, 2))
    expect(typeof curry(testFn3)).toBe('function')
    expect(curry(testFn3)(1)(2)(3)).toBe(testFn3(1, 2, 3))
    expect(typeof curry(testFn5)).toBe('function')
    expect(curry(testFn5)(1)(2)(3)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
  })
  it('可选参数、剩余参数测试', () => {
    const testFnA = (a: number, b = 2) => `a: ${a}, b: ${b}`
    const curriedFnA = curry(testFnA)
    expect(curriedFnA(_, 2)(1)).toBe(testFnA(1, 2))
    const testFnB = (a: number, ...arr: number[]) => a + arr.join(', ')
    const curriedFnB = curry(testFnB)
    // @ts-ignore
    expect(curriedFnB(_, 2)(1)).toBe(testFnB(1, 2))
  })
  it('占位符测试', () => {
    const curriedFn5 = curry(testFn5)

    expect(curry(testFn5)()(1)(2)(3)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)()(2)(3)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(2)()(3)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(2)(3)()(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(2)(3)(4)()(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(_)(1)(2)(3)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(_)(2)(3)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(2)(_)(3)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(2)(3)(_)(4)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(2)(3)(4)(_)(5)).toBe(testFn5(1, 2, 3, 4, 5))

    expect(curry(testFn5)()(1, 2, 3, 4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)()(2, 3, 4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2)()(3, 4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2, 3)()(4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2, 3, 4)()(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(_)(1, 2, 3, 4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1)(_)(2, 3, 4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2)(_)(3, 4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2, 3)(_)(4, 5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2, 3, 4)(_)(5)).toBe(testFn5(1, 2, 3, 4, 5))

    expect(curry(testFn5)(_, 2, 3, 4, 5)(1)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(_, 2)(_, 3, 4, 5)(1)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(_, 2, 3)(_, 4, 5)(1)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(_, 2, 3, 4)(_, 5)(1)).toBe(testFn5(1, 2, 3, 4, 5))

    expect(curry(testFn5)(1, _, 3, 4, 5)(2)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, _)(_, 3, 4, 5)(2)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, _, 3)(_, 4, 5)(2)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, _, 3, 4)(_, 5)(2)).toBe(testFn5(1, 2, 3, 4, 5))

    expect(curriedFn5()()(1, 2, _, 4, 5)(3)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curriedFn5()()(1, 2)(_, 4, 5)(3)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curriedFn5()()(1, 2, _)(_, 4, 5)(3)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curriedFn5()()(1, 2, _, 4)(_, 5)(3)).toBe(testFn5(1, 2, 3, 4, 5))

    expect(curry(testFn5)(1, 2, 3, _, 5)(4)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2)(3, _, 5)(4)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2, 3)(_, 5)(4)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curry(testFn5)(1, 2, 3, _)(_, 5)(4)).toBe(testFn5(1, 2, 3, 4, 5))

    expect(curriedFn5()()(1, 2, 3, 4, _)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curriedFn5()()(1, 2)(3, 4, _)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curriedFn5()()(1, 2, 3)(4, _)(5)).toBe(testFn5(1, 2, 3, 4, 5))
    expect(curriedFn5()()(1, 2, 3, 4)(_)(5)).toBe(testFn5(1, 2, 3, 4, 5))
  })
  it('压力测试', () => {
    const a = 1
    const b = true
    const c = 'abc'
    const d = 2
    const e = false
    const f = 'def'
    const g = 3
    const h = true
    const i = 'ghi'
    const j = 4
    const k = false
    const l = 'jkl'
    const targetRes = testFn12(a, b, c, d, e, f, g, h, i, j, k, l)
    const curriedFn12 = curry(testFn12)
    const testA = curriedFn12(_, _, _, d, e, f, g, h, i, _, _, _)
    const testB = curriedFn12(_, _, _, d, e, f, _, _, _, j, k, l)

    expect(testA(a, b, c)(j, k, l)).toBe(targetRes)
    expect(testA(_, _, _, j, k, l)(a, b, c)).toBe(targetRes)
    expect(testA(_, b, _, j, k, l)(a, c)).toBe(targetRes)
    expect(testA(a, b, _, j, k, l)(c)).toBe(targetRes)
    expect(testA(a, b, c, _, _, _)(j, k, l)).toBe(targetRes)
    expect(testA(a, b, c, _, _, l)(j, k)).toBe(targetRes)
    expect(testA(a, b, c, _, k, l)(j)).toBe(targetRes)

    expect(testB(a, b, c)(g, h, i)).toBe(targetRes)
    expect(testB(_, _, _, g, h, i)(a, b, c)).toBe(targetRes)
    expect(testB(_, b, _, g, h, i)(a, c)).toBe(targetRes)
    expect(testB(a, b, _, g, h, i)(c)).toBe(targetRes)
    expect(testB(a, b, c, _, _, _)(g, h, i)).toBe(targetRes)
    expect(testB(a, b, c, _, _, i)(g, h)).toBe(targetRes)
    expect(testB(a, b, c, _, h, i)(g)).toBe(targetRes)
  })
  it('非法参数测试', () => {
    expect(() => curry({} as any)).toThrow()
  })
  it('this 指向测试', () => {
    type TestObj = { a: number; fn: (...args: number[]) => any }
    // 3 个参数
    const baseFn1 = function (this: TestObj, b: number, c: number, d: number) {
      return this.a + ':' + b + ':' + c + ':' + d
    }
    const obj1: TestObj = { a: 1, fn: baseFn1 }
    const target1 = obj1.fn(2, 3, 4)
    console.log(target1)
    const curriedFn1 = curry(baseFn1)
    obj1.fn = curriedFn1
    expect(obj1.fn(2, 3, 4)).toBe(target1)
    obj1.fn = curriedFn1(_)
    expect(obj1.fn(2, 3, 4)).toBe(target1)
    obj1.fn = curriedFn1(_)(_, 3)(_)
    expect(obj1.fn(2, 4)).toBe(target1)
    // 1 个参数
    const baseFn2 = function (this: TestObj, b: number) {
      return this.a + ':' + b
    }
    const obj2: TestObj = { a: 2, fn: baseFn2 }
    const target2 = obj2.fn(2)
    console.log(target2)
    const curriedFn2 = curry(baseFn2)
    obj2.fn = curriedFn2
    expect(obj2.fn(2)).toBe(target2)
    obj2.fn = curriedFn2(_)
    expect(obj2.fn(2)).toBe(target2)
    // 多个参数
    const baseFn3 = function (this: TestObj, b: number, c: number, d: number, e: number, f: number) {
      return this.a + ':' + b + c + d + e + f
    }
    const obj3: TestObj = { a: 2, fn: baseFn3 }
    const target3 = obj3.fn(2, 3, 4, 5, 6)
    console.log(target3)
    const curriedFn3 = curry(baseFn3)
    obj3.fn = curriedFn3
    expect(obj3.fn(2, 3, 4, 5, 6)).toBe(target3)
    obj3.fn = curriedFn3(_)(2, _, 4, _, 6)
    expect(obj3.fn(3, 5)).toBe(target3)
    obj3.fn = curriedFn3(_, 3, _, 5, _)(_)
    expect(obj3.fn(2, 4, 6)).toBe(target3)
  })
})
