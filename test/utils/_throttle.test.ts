import { _throttle } from '../../src/utils/_throttle'

describe('_throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('基本使用', () => {
    const _fn = () => 1
    const fn = vi.fn(_fn)
    const throttled = _throttle(fn, 500)
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
    //
    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('leading = false', async () => {
    const _fn = () => 1
    const fn = vi.fn(_fn)
    const throttled = _throttle(fn, 500, { leading: false })
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.advanceTimersByTime(250) // call 1
    expect(fn).toHaveBeenCalledTimes(1)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250) // call 2
    expect(fn).toHaveBeenCalledTimes(2)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })
  it('leading = false trailing = true', async () => {
    const _fn = () => 1
    const fn = vi.fn(_fn)
    const throttled = _throttle(fn, 500, { leading: false, trailing: true })
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.advanceTimersByTime(250) // call 1
    expect(fn).toHaveBeenCalledTimes(1)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250) // call 2
    expect(fn).toHaveBeenCalledTimes(2)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250) // call 3
    expect(fn).toHaveBeenCalledTimes(3)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(250) // call 4
    //
    expect(fn).toHaveBeenCalledTimes(4)
  })
  it('trailing = true', async () => {
    const _fn = () => 1
    const fn = vi.fn(_fn)
    const throttled = _throttle(fn, 500, { trailing: true })
    throttled() // call 1
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250) // call 2
    expect(fn).toHaveBeenCalledTimes(2)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250) // call 3
    expect(fn).toHaveBeenCalledTimes(3)
    //
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(3)
    vi.advanceTimersByTime(250) // call 4
    //
    expect(fn).toHaveBeenCalledTimes(4)
  })
  it('reset 测试 leading', async () => {
    const _fn = () => 1
    const fn = vi.fn(_fn)
    const throttled = _throttle(fn, 500, { leading: true, trailing: false })
    throttled() // call 1
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    expect(fn).toHaveBeenCalledTimes(1)
    throttled() // call 2
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(250)
    throttled.reset() // reset cool down
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
  it('reset 测试 trailing', async () => {
    const _fn = () => 1
    const fn = vi.fn(_fn)
    const throttled = _throttle(fn, 500, { leading: false, trailing: true })
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(0)
    vi.advanceTimersByTime(250) // call 1
    expect(fn).toHaveBeenCalledTimes(1)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(250)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
    throttled.reset() // canceled
    vi.advanceTimersByTime(250)
    expect(fn).toHaveBeenCalledTimes(1)
  })
  it('this 指向测试', async () => {})
})
