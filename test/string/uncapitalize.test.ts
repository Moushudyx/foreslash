import { uncapitalize } from "../../src"

describe('uncapitalize', () => {
  it('基本功能', () => {
    expect(uncapitalize('')).toBe('')
    expect(uncapitalize('123')).toBe('123')
    expect(uncapitalize('hello world')).toBe('hello world')
    expect(uncapitalize('Word')).toBe('word')
  })
})
