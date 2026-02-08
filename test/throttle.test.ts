import { throttle } from '../src'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('基本使用', async () => {
    const _fn = () => 1
    const fn = vi.fn(_fn)
    const throttled = throttle(fn, 500)
    throttled() // call 1
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    expect(fn).toHaveBeenCalledTimes(1)
    //
    throttled() // call 2
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250)
    expect(fn).toHaveBeenCalledTimes(2)
    //
    throttled() // call 3
    throttled()
    expect(fn).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(250)
    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('非法参数测试', async () => {
    const fn = () => 1
    expect(() => throttle(fn, 0)).toThrow()
    expect(() => throttle(fn, Infinity)).toThrow()
    expect(() => throttle(fn, NaN)).toThrow()
    expect(() => throttle(fn, -1)).toThrow()
    // @ts-ignore
    expect(() => throttle(fn, '1')).toThrow()
    // @ts-ignore
    expect(() => throttle(fn)).toThrow()
  })
})
