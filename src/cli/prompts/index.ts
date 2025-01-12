import { confirm, input } from '@inquirer/prompts';

export const getSchemaPaths = async (paths: string[] = []): Promise<string[]> => {
  const path = await input({
    message: 'Enter schema path:',
    default: './src/gql/typeDefs/*.ts',
  });

  paths.push(path);

  const additionalInput = await confirm({ message: 'Do you have another path to provide?' });
  if (additionalInput) {
    await getSchemaPaths(paths);
  }

  return paths;
};

export const getOutputPath = async (): Promise<string> =>
  input({
    message: 'Where would you like to write the output?',
    default: './schema.graphql',
    validate: (val) => {
      return val?.includes('.graphql') || 'The output has to use the .graphql file extension';
    },
  });

export const getPrintScriptName = async (): Promise<string> =>
  input({
    message: 'What would you like to name the npm script to print your schema?',
    default: 'schema:print',
    validate: (val) => !!val?.length,
  });

export const getCheckScriptName = async (): Promise<string> =>
  input({
    message: 'What would you like to name the npm script to check your schema?',
    default: 'schema:check',
    validate: (val) => !!val?.length,
  });

export const confirmAddFilesToGitStaging = async (): Promise<boolean> => 
  confirm({ message: 'Do you want to add the new files to the git staging area?' });
