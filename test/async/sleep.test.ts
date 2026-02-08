import { sleep } from '../../src/index'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('基本功能', async () => {
    let res = 0
    const addAfter1s = async () => {
      await sleep()
      res++
    }
    const addAfter2s = async () => {
      await sleep(2e3)
      res++
    }
    addAfter1s()
    addAfter2s()
    await vi.advanceTimersByTimeAsync(500)
    expect(res).toBe(0)
    await vi.advanceTimersByTimeAsync(505)
    expect(res).toBe(1)
    await vi.advanceTimersByTimeAsync(500)
    expect(res).toBe(1)
    await vi.advanceTimersByTimeAsync(505)
    expect(res).toBe(2)
  })
})
