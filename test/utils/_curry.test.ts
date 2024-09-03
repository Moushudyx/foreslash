import { _ } from '../../src'
import { _curry1 } from '../../src/utils/_curry1'
import { _curry2 } from '../../src/utils/_curry2'
import { _curry3 } from '../../src/utils/_curry3'
import { _curryAny } from '../../src/utils/_curryAny'

describe('_curry1', () => {
  const testFn = function (a: number) {
    return `a: ${a}`
  }
  it('基本测试', () => {
    expect(typeof _curry1(testFn)).toBe('function')
    expect(_curry1(testFn)(1)).toBe(testFn(1))
  })
  it('占位符测试', () => {
    expect(typeof _curry1(testFn)()).toBe('function')
    expect(typeof _curry1(testFn)(_)).toBe('function')
    expect(_curry1(testFn)()(1)).toBe(testFn(1))
    expect(_curry1(testFn)(_)(1)).toBe(testFn(1))
  })
  // it('this 指向测试', () => {})
})
describe('_curry2', () => {
  const testFn = function (a: number, b: number) {
    return `a: ${a}, b: ${b}`
  }
  it('基本测试', () => {
    expect(typeof _curry2(testFn)).toBe('function')
    expect(_curry2(testFn)(1, 2)).toBe(testFn(1, 2))
    expect(_curry2(testFn)(1)(2)).toBe(testFn(1, 2))
  })
  it('占位符测试', () => {
    expect(_curry2(testFn)(1)()(2)).toBe(testFn(1, 2))
    expect(_curry2(testFn)()(1)(2)).toBe(testFn(1, 2))
    expect(_curry2(testFn)(1)(_)(2)).toBe(testFn(1, 2))
    expect(_curry2(testFn)(_)(1)(2)).toBe(testFn(1, 2))

    expect(_curry2(testFn)()()(1, 2)).toBe(testFn(1, 2))
    expect(_curry2(testFn)()(_)(1, 2)).toBe(testFn(1, 2))
    expect(_curry2(testFn)(_)()(1, 2)).toBe(testFn(1, 2))
    expect(_curry2(testFn)(_)(_)(1, 2)).toBe(testFn(1, 2))

    expect(_curry2(testFn)(3, _)(4)).toBe(testFn(3, 4))
    expect(_curry2(testFn)(_, 4)(3)).toBe(testFn(3, 4))
    expect(_curry2(testFn)(_, _)(3, 4)).toBe(testFn(3, 4))
    expect(_curry2(testFn)(3, _)(_)(4)).toBe(testFn(3, 4))
    expect(_curry2(testFn)(_, 4)(_)(3)).toBe(testFn(3, 4))
    expect(_curry2(testFn)(_, _)(_)()(3, 4)).toBe(testFn(3, 4))
  })
  // it('this 指向测试', () => {})
})
describe('_curry3', () => {
  const testFn = function (a: number, b: number, c: number) {
    return `a: ${a}, b: ${b}, c: ${c}`
  }
  it('基本测试', () => {
    expect(typeof _curry3(testFn)).toBe('function')
    expect(_curry3(testFn)(1, 2, 3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1)(2, 3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1, 2)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1)(2)(3)).toBe(testFn(1, 2, 3))
  })
  it('占位符测试', () => {
    expect(_curry3(testFn)()(1)(2)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(_)(1)(2)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(_, _)(1)(2)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(_, _, _)(1)(2)(3)).toBe(testFn(1, 2, 3))

    expect(_curry3(testFn)(1)(2)()(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1)()(2)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1)(2)(_)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1)(_)(2)(3)).toBe(testFn(1, 2, 3))

    expect(_curry3(testFn)(1, _)(2)()(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1, _)()(2)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1, _)(2)(_)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1, _)(_)(2)(3)).toBe(testFn(1, 2, 3))

    expect(_curry3(testFn)(1, _, _)(2)()(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1, _, _)()(2)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1, _, _)(2)(_)(3)).toBe(testFn(1, 2, 3))
    expect(_curry3(testFn)(1, _, _)(_)(2)(3)).toBe(testFn(1, 2, 3))

    expect(_curry3(testFn)(_, 5)(4)()(6)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5)()(4)(6)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5)(4)(_)(6)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5)(_)(4)(6)).toBe(testFn(4, 5, 6))

    expect(_curry3(testFn)(_, 5, _)(4)()(6)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5, _)()(4)(6)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5, _)(4)(_)(6)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5, _)(_)(4)(6)).toBe(testFn(4, 5, 6))

    expect(_curry3(testFn)(4, 5, _)()(6)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5, 6)()(4)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(4, _, 6)()(5)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, _, 6)(_, 5)(4)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(_, 5, _)(_, 6)(4)).toBe(testFn(4, 5, 6))
    expect(_curry3(testFn)(4, _, _)(_, 6)(5)).toBe(testFn(4, 5, 6))
  })
  // it('this 指向测试', () => {})
})
