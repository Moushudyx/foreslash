import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
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
