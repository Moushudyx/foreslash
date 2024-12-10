import { uuidV4, uuidNil } from '../../src/index'

describe('uuid', () => {
  it('基本测试', () => {
    // UUID V4
    const testUuidV4 = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/
    const uuid1 = uuidV4()
    const uuid2 = uuidV4()
    expect(uuid1).toMatch(testUuidV4)
    expect(uuid2).toMatch(testUuidV4)
    expect(uuid1).not.toBe(uuid2)
    const uuid3 = uuidV4()
    const uuid4 = uuidV4()
    expect(uuid3).toMatch(testUuidV4)
    expect(uuid4).toMatch(testUuidV4)
    expect(uuid3).not.toBe(uuid4)
    // 空 UUID
    expect(uuidNil).toBe('00000000-0000-0000-0000-000000000000')
  })
})
