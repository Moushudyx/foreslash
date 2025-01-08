import { getAcceptableExtByMIME } from '../../src'

describe('getAcceptableExtByMIME', () => {
  it('基本功能', () => {
    // image
    expect(getAcceptableExtByMIME('image/jpeg')).toContain('jpg')
    expect(getAcceptableExtByMIME('image/jpeg')).toContain('jpeg')
    expect(getAcceptableExtByMIME('image/*')).toContain('jpg')
    expect(getAcceptableExtByMIME('image/*')).toContain('jpeg')
    expect(getAcceptableExtByMIME('image/*')).toContain('png')
    expect(getAcceptableExtByMIME('image/*')).toContain('bmp')
    expect(getAcceptableExtByMIME('image/*')).toContain('tiff')
    expect(getAcceptableExtByMIME('image/*')).toContain('ico')
    expect(getAcceptableExtByMIME('image/*')).toContain('svg')
    expect(getAcceptableExtByMIME('image/*')).toContain('webp')
    expect(getAcceptableExtByMIME('image/*')).toContain('gif')
    expect(getAcceptableExtByMIME('image/*')).toContain('heic')
    expect(getAcceptableExtByMIME('image/*')).toContain('avif')
    expect(getAcceptableExtByMIME('image/*')).toContain('heif')
    // video
    expect(getAcceptableExtByMIME('video/x-ms-wmv')).toContain('wmv')
    expect(getAcceptableExtByMIME('video/*')).toContain('mp4')
    expect(getAcceptableExtByMIME('video/*')).toContain('avi')
    expect(getAcceptableExtByMIME('video/*')).toContain('wmv')
    expect(getAcceptableExtByMIME('video/*')).toContain('mov')
    expect(getAcceptableExtByMIME('video/*')).toContain('flv')
    expect(getAcceptableExtByMIME('video/*')).toContain('mkv')
    expect(getAcceptableExtByMIME('video/*')).toContain('webm')
    expect(getAcceptableExtByMIME('video/*')).toContain('mpeg')
  })
  it('错误输入测试', () => {
    // @ts-ignore
    expect(getAcceptableExtByMIME(0)).toEqual([])
    // @ts-ignore
    expect(getAcceptableExtByMIME(12)).toEqual([])
    expect(getAcceptableExtByMIME('')).toEqual([])
    expect(getAcceptableExtByMIME('*/')).toEqual([])
    expect(getAcceptableExtByMIME('/*')).toEqual([])
    expect(getAcceptableExtByMIME('a/*')).toEqual([])
    expect(getAcceptableExtByMIME('///')).toEqual([])
    expect(getAcceptableExtByMIME('*/jpeg')).toEqual([])
    expect(getAcceptableExtByMIME('a/b')).toEqual([])
    expect(getAcceptableExtByMIME('a/b/c/d')).toEqual([])
  })
})
