import { resolve } from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  configDefaults,
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
