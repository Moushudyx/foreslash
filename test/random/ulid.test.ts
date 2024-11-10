import { ulid } from '../../src/index'

describe('ulid', () => {
  it('基本测试', () => {
    const ulid1 = ulid()
    const ulid2 = ulid()
    expect(ulid1).toMatch(/^[A-Z0-9]{26}$/)
    expect(ulid2).toMatch(/^[A-Z0-9]{26}$/)
    expect(ulid1).not.toBe(ulid2)
    const ulid3 = ulid(false)
    const ulid4 = ulid(false)
    expect(ulid3).toMatch(/^[A-Z0-9]{26}$/)
    expect(ulid4).toMatch(/^[A-Z0-9]{26}$/)
    expect(ulid3).not.toBe(ulid4)
  })
  it('单调递增', () => {
    const now = Date.now()
    const ulid1 = ulid(true, now)
    const ulid2 = ulid(true, now)
    expect(ulid1).not.toBe(ulid2)
    expect(ulid1.substring(0, 10)).toEqual(ulid2.substring(0, 10))
  })
})
