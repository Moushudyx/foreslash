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
  // it('this 指向测试', () => {})
})
