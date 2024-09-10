import { pipe, pass } from '../src'

describe('pipe', () => {
  it('基本功能', () => {
    const add = (a: number) => a + 1
    const square = (a: number) => a * a
    expect(pipe(add)(2)).toBe(3)
    expect(pipe(add, square)(2)).toBe(9)
    expect(pipe(square, square, add)(2)).toBe(17)
    expect(pipe(square, pass, square, pass, pass, pass, pass, pass, add)(2)).toBe(17)
  })
  it('非法参数测试', () => {
    // @ts-ignore
    expect(() => pipe()).toThrow()
    expect(() => pipe([] as any)).toThrow()
  })
})
