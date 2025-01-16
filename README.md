# Apollo Subgraph CLI

## Overview

The **Apollo Subgraph CLI** is a powerful tool for managing federated subgraph schemas in Apollo Federation.
It enables easy validation, transformation, and generation of schema files, while integrating seamlessly with 
configuration files for streamlined workflows.

### Key Features

- **Schema Validation and Generation**: Validate and generate consolidated schema files from multiple type definitions.
- **Watch Mode**: Automatically regenerate schema files when type definitions change.
- **Config-Driven Workflow**: Use a `subgraph.config.ts` file to centralize and simplify CLI command configurations.
- **Interactive Initialization**: Quickly set up a new subgraph schema project with helpful prompts.

---

## Installation

Install the CLI as a development dependency using your preferred package manager:

### npm

```bash
npm install --save-dev apollo-subgraph-cli
```

### pnpm

```bash
pnpm add -D apollo-subgraph-cli
```

### yarn

```bash
yarn add --dev apollo-subgraph-cli
```

---

## Usage

The CLI provides commands under the primary `subgraph` command.

### General Syntax

```bash
subgraph <command> [options]
```

Run `subgraph --help` to view available commands and options.

---

### Commands

#### 1. **init**
Sets up a new subgraph schema project interactively.

**Usage:**
```bash
subgraph schema init
```

The `init` command will:

1. **Prompt for Input**:
    - Location of the type definitions (supports glob patterns).
    - Path for the generated schema file (recommended: project root).
    - Names for `print` and `check` commands as npm scripts.
    - Whether to stage newly created files in Git.

2. **Generate Configuration and Schema Files**:
    - Creates a `subgraph.config.ts` file, used to centralize CLI configuration. This file is parsed by [cosmiconfig](https://github.com/davidtheclark/cosmiconfig), and its TypeScript definitions are published for consumer use.
    - Consolidates the type definitions into the specified schema file.

3. **Update `package.json` Scripts**:
    - Writes `print` and `check` npm scripts pointing to the `subgraph.config.ts` file.

4. **Git Integration**:
    - Stages the newly created files (if approved by the user).

**Example Workflow:**

```bash
subgraph schema init
```

Given the following directory/file structure, The CLI will:
```
./src/gql/schema/typeDefs/
├── shoppingCart.graphql
├── order.graphql
└── payment.graphql
```

- Prompt for input.
- Generate files like:
    - `subgraph.config.ts`
    - Consolidated schema file (e.g., `subgraph.graphql` in the project root).
- Update `package.json` with commands like:
  ```json
  "scripts": {
    "schema:print": "subgraph schema print -c subgraph.config.ts",
    "schema:check": "subgraph schema check -c subgraph.config.ts"
  }
  ```
- Stage untracked files (if confirmed).

**Generated `subgraph.config.ts`:**

```typescript
import type { SubgraphConfig } from 'apollo-subgraph-cli';

/**
 * @property schema - The location of your subgraph's typeDefs
 * @property output - The path to the printed schema file
 */

const config: SubgraphConfig = {
  schema: ['./src/gql/schema/typeDefs/*.graphql', '!./src/gql/schema/typeDefs/index.graphql'],
  output: './src/gql/schema/schema.graphql',
};

export default config;
```

**Note:** Consumers can specify files to exclude/ignore using the `!` sign. For example:

- In the config file:
  ```typescript
  const config: SubgraphConfig = {
    schema: ['./src/gql/schema/typeDefs/*.ts', '!./src/gql/schema/typeDefs/index.ts'],
    output: './schema.graphql',
  };
  ```

- As variadic arguments:
  ```bash
  subgraph schema print --config subgraph.config.ts -s './src/gql/schema/typeDefs/*.ts' '!./src/gql/schema/typeDefs/index.ts'
  ```

---

#### 2. **schema**

Manage subgraph schemas.

```bash
subgraph schema <command> [options]
```

#### Schema Subcommands

##### a. **check**

Validates the subgraph schema using provided or configured type definitions.

**Usage:**

```bash
subgraph schema check [options]
```

**Options:**

- `-c, --config <path-to-subgraph-config>`\
  Path to the subgraph configuration file.
- `-s, --schema <schema-location...>`\
  Location(s) of the subgraph's type definitions (e.g., `.graphql` files).

**Example:**

```bash
subgraph schema check -c subgraph.config.ts -s ./src/gql/schema/typeDefs/*.graphql
```

---

##### b. **print**

Generates a consolidated schema file from the provided or configured type definitions.

**Usage:**

```bash
subgraph schema print [options]
```

**Options:**

- `-c, --config <path-to-subgraph-config>`\
  Path to the subgraph configuration file.
- `-s, --schema <schema-location...>`\
  Location(s) of the subgraph's type definitions.
- `-o, --output <output-path>`\
  Path to the output schema file (recommended: project root).
- `-w, --watch`\
  Watch for changes in schema files and automatically generate the output.

**Example:**

```bash
subgraph schema print -s './src/gql/schema/typeDefs/*.graphql' -o ./schema.graphql
```

**Tip:** For development environments, consider adding a watcher to your npm scripts using the `concurrently` package. For example:

```json
"scripts": {
  "dev": "concurrently \"npm run dev\" \"subgraph schema print --watch\""
}
```

---

## Configuration

The `subgraph.config.ts` file simplifies CLI usage by centralizing schema management configurations. It eliminates the need to repeatedly specify command-line arguments, while still allowing overrides.

### Example `subgraph.config.ts`

```typescript
import type { SubgraphConfig } from 'apollo-subgraph-cli';

/**
 * @property schema - The location of your subgraph's typeDefs
 * @property output - The path to the printed schema file
 */

const config: SubgraphConfig = {
  schema: ['./src/gql/schema/typeDefs/*.graphql', '!./src/gql/schema/typeDefs/index.graphql'],
  output: './src/gql/schema/schema.graphql',
};

export default config;
```

### Benefits of Using `subgraph.config.ts`

- Centralized schema locations and output paths.
- Simplifies script definitions in `package.json`.
- Reduces command-line complexity.
- Supports arg overrides for flexibility.

---

### Example Workflow

1. **Initialize a subgraph project:**

   ```bash
   subgraph schema init
   ```

2. **Validate your schema:**

   ```bash
   subgraph schema check
   ```

   The CLI uses the `subgraph.config.ts` file for defaults.

3. **Generate a consolidated schema:**

   ```bash
   subgraph schema print
   ```

4. **Enable watch mode for automatic updates:**

   ```bash
   subgraph schema print -w
   ```

---

## Support

For issues or feature requests, visit [GitHub Issues](https://github.com/platypusrex/apollo-subgraph-cli/issues).

---

## Contributors
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

## License

This project is licensed under the [MIT License](./LICENSE).

