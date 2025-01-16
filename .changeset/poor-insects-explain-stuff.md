---
"apollo-subgraph-cli": patch
---

Initial release of apollo-subgraph-cli. Currently, this is a tool that helps manage 
schema for federated apollo subgraphs. More specifically, allows consumers to generate
a single schema file in SDL format (.graphql) which is currently a requirement when
using the rover cli to publish subgraph schemas to GraphOS. While rover supports
generating this schema file, it only supports this via introspection. The apollo-subgraph-cli
manages this task without that overhead.
