import { capitalize } from "../../src"

describe('capitalize', () => {
  it('基本功能', () => {
    expect(capitalize('')).toBe('')
    expect(capitalize('hello world')).toBe('Hello world')
  })
})
