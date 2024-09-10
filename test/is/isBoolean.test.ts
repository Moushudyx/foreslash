import { isBoolean } from "../../src/index";

describe('isBoolean', () => {
    it('基本功能', () => {
        expect(isBoolean(true)).toBe(true);
        expect(isBoolean(false)).toBe(true);
        expect(isBoolean(null)).toBe(false);
        expect(isBoolean(undefined)).toBe(false);
        expect(isBoolean(0)).toBe(false);
    })
})
