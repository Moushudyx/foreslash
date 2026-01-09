/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/test/setup/polyfills.ts'],
  transform: {
    '\\.[jt]s$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}
