import { noop, pass, passWith } from '../src/index'

describe('noop', () => {
  it('不处理参数', () => {
    const args = [1, 'two', true, null, undefined, {}, []]
    expect(noop(...args)).toBe(undefined)
    const spy = jest.fn()
    noop(spy)
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('pass', () => {
  it('不处理参数', () => {
    const args = [1, 'two', true, null, undefined, {}, []] as const
    expect(pass(...args)).toBe(args[0])
    expect(pass()).toBe(undefined)
    const spy = jest.fn()
    pass(spy)
    expect(spy).not.toHaveBeenCalled()
  })
})

describe('passWith', () => {
  it('不处理参数', () => {
    const args = [1, 'two', true, null, undefined, {}, []] as const
    expect(passWith(noop)(...args)).toBe(args[0])
    expect(passWith(noop)()).toBe(undefined)
  })
  it('调用函数', () => {
    const fn = jest.fn()
    expect(passWith(fn)(1)).toBe(1)
    expect(passWith(fn)()).toBe(undefined)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
