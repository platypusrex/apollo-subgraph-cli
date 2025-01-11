import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { schema } from './gql/schema';

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('🚀 Server running on port http://localhost:4000/graphql');
});
