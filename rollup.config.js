import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'

const banner = `/*!
Copyright (c) 2024 moushu
foreslash is licensed under Mulan PSL v2.
You can use this software according to the terms and conditions of the Mulan PSL v2.
You may obtain a copy of Mulan PSL v2 at:
          http://license.coscl.org.cn/MulanPSL2
THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
See the Mulan PSL v2 for more details.
*/`

const commonOutputConfig = {
  banner,
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        ...commonOutputConfig,
        file: 'lib/index.cmn.cjs',
        format: 'cjs',
      },
      {
        ...commonOutputConfig,
        file: 'lib/index.mjs',
        format: 'esm',
      },
      {
        ...commonOutputConfig,
        file: 'lib/index.umd.js',
        format: 'umd',
        name: 'foreslash',
      },
    ],
    plugins: [typescript({ declaration: false, removeComments: true })],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.d.ts',
        format: 'esm',
      },
    ],
    plugins: [dts()],
  },
]
