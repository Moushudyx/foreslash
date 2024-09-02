import { noop, pass } from '../../src/index'

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
