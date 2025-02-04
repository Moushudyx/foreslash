import { sleep } from '../../src/index'

describe('sleep', () => {
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
    await sleep(500)
    expect(res).toBe(0)
    await sleep(505)
    expect(res).toBe(1)
    await sleep(500)
    expect(res).toBe(1)
    await sleep(505)
    expect(res).toBe(2)
  })
})
