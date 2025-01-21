# apollo-subgraph-cli

## 0.1.0

### Minor Changes

- 8e2777c: Moving @apollo/subgraph to peer dependency in an attempt to avoid multiple versions of the package being installed by consumers. Docs have been updated to call out the installation of @apollo/subgraph as a requirement.

## 0.0.3

### Patch Changes

- 9ab8398: Updates documentation to better explain the requirements for file watching when using the print command.

## 0.0.2

### Patch Changes

- 002b5fb: Updates and cleans up the readme/documentation.

## 0.0.1

### Patch Changes

- 5e4c1c7: Initial release of apollo-subgraph-cli. Currently, this is a tool that helps manage schema for federated apollo subgraphs. More specifically, allows consumers to generate a single schema file in SDL format (.graphql) which is currently a requirement when using the rover cli to publish subgraph schemas to GraphOS. While rover supports generating this schema file, it only supports this via introspection. The apollo-subgraph-cli manages this task without that overhead.
