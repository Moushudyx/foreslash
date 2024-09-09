import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.common.cjs',
        format: 'cjs',
      },
      {
        file: 'lib/index.mjs',
        format: 'esm',
      },
      {
        file: 'lib/index.umd.js',
        format: 'umd',
        name: 'foreslash',
      },
    ],
    plugins: [
      typescript()
    ]
  }
]
