import { capitalize } from "../../src"

describe('capitalize', () => {
  it('基本功能', () => {
    expect(capitalize('')).toBe('')
    expect(capitalize('123')).toBe('123')
    expect(capitalize('hello world')).toBe('Hello world')
    expect(capitalize('Word')).toBe('Word')
  })
})
