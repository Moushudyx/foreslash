import { splitWords } from '../../src'

describe('splitWords', () => {
  it('基本功能', () => {
    expect(splitWords('')).toEqual([''])
    expect(splitWords('这是一段文字')).toEqual([''])
    expect(splitWords('getTestUUID1234')).toEqual(['get', 'Test', 'UUID', '1234'])
    expect(splitWords('user_nick_name')).toEqual(['user', 'nick', 'name'])
    expect(splitWords('A文字B🎈C= =Test')).toEqual(['A', 'B', 'C', 'Test'])
    expect(splitWords('getUUIDVer4ForTest1')).toEqual(['get', 'UUID', 'Ver', '4', 'For', 'Test', '1'])
  })
})
