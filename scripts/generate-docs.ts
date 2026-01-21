import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateReferenceDocs } from '@tanstack/typedoc-config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

await generateReferenceDocs({
  packages: [
    {
      name: 'keys',
      entryPoints: [resolve(__dirname, '../packages/keys/src/index.ts')],
      tsconfig: resolve(__dirname, '../packages/keys/tsconfig.docs.json'),
      outputDir: resolve(__dirname, '../docs/reference'),
    },
    {
      name: 'react-keys',
      entryPoints: [resolve(__dirname, '../packages/react-keys/src/index.ts')],
      tsconfig: resolve(__dirname, '../packages/react-keys/tsconfig.docs.json'),
      outputDir: resolve(__dirname, '../docs/framework/react/reference'),
      exclude: ['packages/keys/**/*'],
    },
    // {
    //   name: 'solid-keys',
    //   entryPoints: [
    //     resolve(__dirname, '../packages/solid-keys/src/index.ts'),
    //   ],
    //   tsconfig: resolve(
    //     __dirname,
    //     '../packages/solid-keys/tsconfig.docs.json',
    //   ),
    //   outputDir: resolve(__dirname, '../docs/framework/solid/reference'),
    //   exclude: ['packages/keys/**/*'],
    // },
  ],
})

console.log('\n✅ All markdown files have been processed!')

process.exit(0)
