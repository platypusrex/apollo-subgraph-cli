const config = {
  overwrite: true,
  schema: ["src/gql/schema/typeDefs/*.ts", 'src/gql/schema/typeDefs/*.graphql'],
  generates: {
    "src/types/generated.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  },
  config: {
    federation: true,
  },
};

export default config;
