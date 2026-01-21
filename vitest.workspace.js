import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      './packages/keys/vitest.config.ts',
      './packages/keys-devtools/vitest.config.ts',
      './packages/react-keys/vitest.config.ts',
      './packages/react-keys-devtools/vitest.config.ts',
      // './packages/solid-keys/vitest.config.ts',
      // './packages/solid-keys-devtools/vitest.config.ts',
    ],
  },
})
