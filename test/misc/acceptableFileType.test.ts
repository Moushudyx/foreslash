import { acceptableFileType } from '../../src'

describe('acceptableFileType', () => {
  it('基本功能', () => {
    expect(acceptableFileType('text/plain', 'text/plain')).toBe(true)
    expect(acceptableFileType('text/plain', '.txt, image/jpeg')).toBe(true)
    // PNG
    expect(acceptableFileType('image/png', '*/*')).toBe(true)
    expect(acceptableFileType('image/png', '.png,*/*')).toBe(true)
    expect(acceptableFileType('image/png', 'image/*')).toBe(true)
    expect(acceptableFileType('image/png', 'image/png')).toBe(true)
    expect(acceptableFileType('image/png', 'image/jpeg,image/png')).toBe(true)
    expect(acceptableFileType('image/png', '.png')).toBe(true)
    expect(acceptableFileType('image/png', 'image/jpeg,.png')).toBe(true)
    expect(acceptableFileType('image/png', 'image/jpeg')).toBe(false)
    expect(acceptableFileType('image/png', 'image/jpeg,.jpg')).toBe(false)
    // 区分 C 与 C++ 源文件拓展名
    expect(acceptableFileType('text/x-c++src', '.C')).toBe(true)
    expect(acceptableFileType('text/x-c++src', '.c')).toBe(false)
    expect(acceptableFileType('text/x-c', '.c')).toBe(true)
    expect(acceptableFileType('text/x-c', '.C')).toBe(false)
  })
  it('大小写不敏感', () => {
    expect(acceptableFileType('IMAGE/png', '.PNG')).toBe(true)
    expect(acceptableFileType('image/PNG', '.pNg')).toBe(true)
    expect(acceptableFileType('image/png', 'IMAGE/*')).toBe(true)
    expect(acceptableFileType('image/png', 'image/PNG')).toBe(true)
    expect(acceptableFileType('image/PNG', 'image/JPEG')).toBe(false)
    expect(acceptableFileType('IMAGE/png', 'image/jpeg,.JPG')).toBe(false)
    // 区分 C 与 C++ 源文件拓展名
    expect(acceptableFileType('TEXT/X-C++src', '.C')).toBe(true)
    expect(acceptableFileType('TEXT/X-C++src', '.c')).toBe(false)
    expect(acceptableFileType('TEXT/X-C', '.c')).toBe(true)
    expect(acceptableFileType('TEXT/X-C', '.C')).toBe(false)
  })
})
