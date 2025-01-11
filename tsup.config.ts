import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/cli/index.ts'],
  sourcemap: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  shims: true,
  dts: {
    entry: ['src/typings/index.ts'],
  },
  tsconfig: './tsconfig.type.json',
});
