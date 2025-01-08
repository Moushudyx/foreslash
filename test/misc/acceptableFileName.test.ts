import { acceptableFileName } from '../../src'

describe('acceptableFileType', () => {
  it('基本功能', () => {
    expect(acceptableFileName('test1.txt', 'text/plain')).toBe(true)
    expect(acceptableFileName('test2.txt', 'text/plain, image/jpeg')).toBe(true)
    // PNG
    expect(acceptableFileName('test3.png', '*/*')).toBe(true)
    expect(acceptableFileName('test4.png', 'image/*')).toBe(true)
    expect(acceptableFileName('test5.png', 'image/png')).toBe(true)
    expect(acceptableFileName('test6.png', 'text/plain, image/png')).toBe(true)
    expect(acceptableFileName('test7.png', 'text/plain, .png')).toBe(true)
    expect(acceptableFileName('test7.png', '.txt, .png')).toBe(true)
    expect(acceptableFileName('test7.png', '.txt, image/*')).toBe(true)
    expect(acceptableFileName('test8.png', '.png, .jpg')).toBe(true)
    expect(acceptableFileName('test9.png', 'text/png, image/jpeg')).toBe(false)
    expect(acceptableFileName('test0.png', 'text/plain, image/jpeg')).toBe(false)
    // 区分 C 与 C++ 源文件拓展名
    expect(acceptableFileName('testA.C', 'text/x-c++src')).toBe(true)
    expect(acceptableFileName('testB.c', 'text/x-c++src')).toBe(false)
    expect(acceptableFileName('testA.C', '.C')).toBe(true)
    expect(acceptableFileName('testB.c', '.C')).toBe(false)
    expect(acceptableFileName('testC.c', 'text/x-c')).toBe(true)
    expect(acceptableFileName('testD.C', 'text/x-c')).toBe(false)
    expect(acceptableFileName('testC.c', '.c')).toBe(true)
    expect(acceptableFileName('testD.C', '.c')).toBe(false)
  })
  it('大小写不敏感', () => {
    expect(acceptableFileName('TEST1.PNg', '.PNG')).toBe(true)
    expect(acceptableFileName('test2.pNg', 'image/*')).toBe(true)
    expect(acceptableFileName('test3.pnG', 'image/PNG')).toBe(true)
    expect(acceptableFileName('test4.Png', 'text/plain, IMAGE/png')).toBe(true)
    expect(acceptableFileName('test5.PNG', 'text/plain, .PNG')).toBe(true)
    expect(acceptableFileName('test6.Png', '.txt, .pNG')).toBe(true)
    expect(acceptableFileName('test7.png', '.tXt, iMaGe/*')).toBe(true)
    expect(acceptableFileName('test8.pNG', '.Png, .Jpg')).toBe(true)
    // 区分 C 与 C++ 源文件拓展名
    expect(acceptableFileName('testA.C', 'TEXT/X-C++src')).toBe(true)
    expect(acceptableFileName('testB.c', 'TEXT/X-C++src')).toBe(false)
    expect(acceptableFileName('testC.c', 'TEXT/X-C')).toBe(true)
    expect(acceptableFileName('testD.C', 'TEXT/X-C')).toBe(false)
  })
})
