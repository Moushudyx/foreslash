import { getAcceptableMIMEByExt } from '../../src'

describe('getAcceptableMIMEByExt', () => {
  it('基本功能', () => {
    // image
    expect(getAcceptableMIMEByExt('mp3')).toContain('audio/mp3')
    expect(getAcceptableMIMEByExt('mp3')).toContain('audio/mpeg')
    expect(getAcceptableMIMEByExt('mp3')).not.toContain('audio/ogg')
    expect(getAcceptableMIMEByExt('png')).toContain('image/png')
    expect(getAcceptableMIMEByExt('apng')).toContain('image/apng')
    expect(getAcceptableMIMEByExt('apng')).not.toContain('image/png')
    // video
    expect(getAcceptableMIMEByExt('c')).toContain('text/x-c')
    expect(getAcceptableMIMEByExt('C')).toContain('text/x-c++src')
    expect(getAcceptableMIMEByExt('c')).not.toContain('text/x-c++src')
    expect(getAcceptableMIMEByExt('C')).not.toContain('text/x-c')
  })
  it('错误输入测试', () => {
    // @ts-ignore
    expect(getAcceptableMIMEByExt(0)).toEqual([])
    // @ts-ignore
    expect(getAcceptableMIMEByExt(12)).toEqual([])
    expect(getAcceptableMIMEByExt('')).toEqual([])
    expect(getAcceptableMIMEByExt('./')).toEqual([])
    expect(getAcceptableMIMEByExt('**')).toEqual([])
    expect(getAcceptableMIMEByExt('...')).toEqual([])
    expect(getAcceptableMIMEByExt('///')).toEqual([])
    expect(getAcceptableMIMEByExt('.1234567890')).toEqual([])
    expect(getAcceptableMIMEByExt('a.b.c.d.e.f.g.h.123')).toEqual([])
  })
})
