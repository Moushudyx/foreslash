import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    pool: 'forks',
    testTimeout: 20_000,
    hookTimeout: 20_000,
    teardownTimeout: 20_000,
    setupFiles: ['test/setup/polyfills.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'clover'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
      exclude: ['**/test/**', 'src/**/*.type.ts'],
    },
  },
})
