/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]s$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}
