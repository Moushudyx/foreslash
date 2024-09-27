import { compose, pass } from '../src'

describe('compose', () => {
  it('基本功能', () => {
    const add = (a: number) => a + 1
    const square = (a: number) => a * a
    expect(compose(add)(2)).toBe(3)
    expect(compose(add, square)(2)).toBe(5)
    expect(compose(square, square, add)(2)).toBe(81)
    expect(compose(square, pass, square, pass, pass, pass, pass, pass, add)(2)).toBe(81)
  })
  it('非法参数测试', () => {
    // @ts-ignore
    expect(() => compose()).toThrow()
    expect(() => compose([] as any)).toThrow()
  })
})
