import fs from 'fs-extra';
import { Command } from 'commander';
import { cliBanner, commands } from './constants';
import { tasks } from './tasks';
import {
  getOutputPath,
  getPrintScriptName,
  getCheckScriptName,
  getSchemaPaths,
  confirmAddFilesToGitStaging,
} from './prompts';
import {
  buildFileWatcher,
  generateSubgraphSchema,
  getSubgraphArgsFromCosmicConfigFile,
} from './utils';

(async () => {
  const packageJSON = await fs.readJson('./package.json');

  // Main command
  const subgraph = new Command('subgraph')
    .description('A CLI for federated subgraph management')
    .version(packageJSON.version);

  // Schema command
  const schema = new Command('schema').description(
    'Helpful commands for managing your subgraph schema'
  );

  schema
    .command(commands.check)
    .option('-c, --config <path-to-subgraph-config>', 'The path to your subgraph config file')
    .option('-s, --schema <schema-location...>', "Location of your subgraph's typeDefs")
    .action(async (options) => {
      cliBanner.header('schema check');

      const config = await getSubgraphArgsFromCosmicConfigFile(options.config);
      const gqlSchemaPath = options.schema ?? config?.schema ?? (await getSchemaPaths());

      try {
        await tasks.check.run({
          schema: { paths: gqlSchemaPath },
        });

        cliBanner.footer();
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    });

  schema
    .command(commands.print)
    .option('-c, --config <path-to-subgraph-config>', 'The path to your subgraph config file')
    .option('-s, --schema <schema-location...>', "Location of your subgraph's typeDefs")
    .option('-o, --output <output-path>', 'The path to the printed schema file')
    .option('-w, --watch', 'Watch for file changes and print the resulting schema file')
    .action(async (options) => {
      const config = await getSubgraphArgsFromCosmicConfigFile(options.config);
      const gqlSchemaPath =
        (options.schema as string[]) ?? config?.schema ?? (await getSchemaPaths());
      const outputPath = (options.output as string) ?? config?.output ?? (await getOutputPath());

      if (options.watch) {
        try {
          await generateSubgraphSchema({ paths: gqlSchemaPath, output: outputPath });
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.message);
          }
        }

        await buildFileWatcher(gqlSchemaPath, outputPath);
      } else {
        cliBanner.header('schema print');

        try {
          await tasks.print.run({
            schema: {
              paths: gqlSchemaPath,
              output: outputPath,
            },
          });

          cliBanner.footer();
        } catch (e) {
          console.error(e);
          process.exit(1);
        }
      }
    });

  schema.command(commands.init).action(async () => {
    cliBanner.header('schema init');
    console.log("Let's get started by answering a few questions about your service.\n");

    const schemaPaths = await getSchemaPaths();
    const outputPath = await getOutputPath();
    const printScriptName = await getPrintScriptName();
    const checkScriptName = await getCheckScriptName();
    const git = await confirmAddFilesToGitStaging();

    console.log('\n');

    try {
      await tasks.init.run({
        git,
        printScriptName,
        checkScriptName,
        schema: {
          paths: schemaPaths,
          output: outputPath,
        },
      });

      cliBanner.footer();
    } catch (e) {
      process.exit(1);
    }
  });

  subgraph.addCommand(schema);
  subgraph.parse();
})();
