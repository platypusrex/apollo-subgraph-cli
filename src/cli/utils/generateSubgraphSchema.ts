import { join, parse } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import fs from 'fs-extra';
import { printSubgraphSchema } from '@apollo/subgraph';
import { loadSchema } from './loadSchema';
import { logPrefix } from './logPrefix';
import type { ListrContext } from '../types';

const { pathExists } = fs;

export const generateSubgraphSchema = async ({ paths, output }: ListrContext['schema']) => {
  let loadedSchema;
  let schemaFilePath;
  try {
    const schemaPaths = paths.map((path) => join(process.cwd(), path));
    loadedSchema = await loadSchema(schemaPaths);
    schemaFilePath = join(process.cwd(), output);

    const { dir } = parse(schemaFilePath);
    const exists = await pathExists(dir);
    if (!exists) {
      mkdirSync(dir, { recursive: true });
    }
  } catch (e: any) {
    throw new Error(`${logPrefix('error', 'ERROR DETECTED')}: ${e.message}`);
  }

  let schema;
  try {
    schema = printSubgraphSchema(loadedSchema);
  } catch (e: any) {
    throw new Error(`${logPrefix('error', 'SCHEMA ERROR DETECTED')}: ${e.message}`);
  }

  try {
    writeFileSync(schemaFilePath, schema);
  } catch (e: any) {
    throw new Error(`${logPrefix('error', 'ERROR DETECTED')}: ${e.message}`);
  }
};
