import { debounce } from '../src'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })
  it('基本使用', async () => {
    const _fn = () => 1
    const fn = jest.fn(_fn)
    const debounced = debounce(fn, 500)
    debounced()
    debounced()
    expect(fn).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(250)
    debounced()
    debounced()
    expect(fn).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(250) // call 1
    expect(fn).toHaveBeenCalledTimes(1)
    //
    debounced()
    debounced()
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(250)
    debounced()
    debounced()
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(250) // call 2
    expect(fn).toHaveBeenCalledTimes(2)
    //
    debounced()
    debounced()
    expect(fn).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(250)
    debounced()
    debounced()
    expect(fn).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(250) // call 3
    expect(fn).toHaveBeenCalledTimes(3)
  })
  it('节流时触发最后一次调用', async () => {
    const res: number[] = []
    const _fn = (num: number) => res.push(num)
    const fn = jest.fn(_fn)
    const debounced = debounce(fn, 500)
    debounced(4)
    debounced(3)
    expect(fn).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(250)
    debounced(2)
    debounced(1)
    expect(fn).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(250) // call 1
    expect(fn).toHaveBeenCalledTimes(1)
    expect(res).toEqual([1])
    //
    debounced(5)
    debounced(4)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(250)
    debounced(3)
    debounced(2)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(250) // call 2
    expect(fn).toHaveBeenCalledTimes(2)
    expect(res).toEqual([1, 2])
  })
  it('节流时不触发最后一次调用', async () => {
    const res: number[] = []
    const _fn = (num: number) => res.push(num)
    const fn = jest.fn(_fn)
    const debounced = debounce(fn, 500, { trailingRunLast: false })
    debounced(4)
    debounced(3)
    expect(fn).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(250)
    debounced(2)
    debounced(1)
    expect(fn).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(250) // call 1
    expect(fn).toHaveBeenCalledTimes(1)
    expect(res).toEqual([4])
    //
    debounced(5)
    debounced(4)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(250)
    debounced(3)
    debounced(2)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(250) // call 2
    expect(fn).toHaveBeenCalledTimes(2)
    expect(res).toEqual([4, 5])
  })
  it('非法参数测试', async () => {
    const fn = () => 1
    expect(() => debounce(fn, 0)).toThrow()
    expect(() => debounce(fn, Infinity)).toThrow()
    expect(() => debounce(fn, NaN)).toThrow()
    expect(() => debounce(fn, -1)).toThrow()
    // @ts-ignore
    expect(() => debounce(fn, '1')).toThrow()
    // @ts-ignore
    expect(() => debounce(fn)).toThrow()
  })
})
