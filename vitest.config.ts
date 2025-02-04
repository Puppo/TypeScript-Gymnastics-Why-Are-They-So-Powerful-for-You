import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    typecheck: {
      enabled: true,
    },
  },
})