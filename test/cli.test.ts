import { exec } from 'node:child_process';
// import { execa } from 'execa';
import { resolve } from 'path';

// const loaded = await tsImport('../src/cli/index.ts', import.meta.url)
// console.log(loaded);

describe('my-cli', () => {
  it('should say hello', async () => {
    const programPath = resolve(__dirname, '../src/cli/index.ts');
    const configPath = resolve(__dirname, './subgraph.config.ts');
    console.log(configPath);
  
    const { stdout } = await exec(`node --import tsx ${programPath} schema print --config ${configPath}`);
    // console.log({ stdout, ...rest })
    console.log(stdout?.on('data', (data) => console.log(data.toString())));
    // expect(stdout).toBe('Hello, John!');
  });
});