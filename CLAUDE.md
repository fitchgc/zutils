# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Build**: `yarn build` or `yarn build` - Uses tsup to build TypeScript files to CommonJS and ESM formats with declaration files
- **Lint**: `yarn lint` or `yarn lint` - Runs ESLint on TypeScript files in src/
- **Format**: `yarn format` or `yarn format` - Auto-fixes ESLint issues  
- **Test**: `yarn test` or `yarn test` - Runs Jest tests

## Architecture

This is a TypeScript utility library (`@fitchgc/zutils`) that provides common utilities and classes for development. The project is built as an ESM package with dual CommonJS/ESM exports.

### Key Structure

- **src/common/**: Core utility classes
  - `ZError`: Custom error handling
  - `SyncLocker`: Synchronization utilities
  - `AsyncQueue`: Asynchronous queue implementation
  - `base.controller`: Base controller class

- **src/utils/**: Utility functions organized by domain
  - `bn.util.ts`: Big number utilities
  - `chain.util.ts`: Blockchain-related utilities  
  - `security.util.ts`: Security and cryptographic functions
  - `wallet.util.ts`: Wallet operations
  - `string.util.ts`, `number.util.ts`, `date.util.ts`, etc.: Type-specific utilities

- **src/redis/**: Redis client wrapper (`ZRedisClient`)

- **src/decorators/**: TypeScript decorators for routing and singleton patterns

### Export Strategy

The package supports granular imports via subpath exports:
- Main exports: `import { SyncLocker } from 'zutils'`
- Utility exports: `import { isTrue } from 'zutils/utils/string.util'`

### Dependencies

Key dependencies include:
- `ethers`: Ethereum blockchain interactions
- `argon2`: Password hashing
- `redis`: Redis client
- `scrypt-js`: Cryptographic functions

### Build Configuration

- **tsup**: Builds both CJS and ESM formats with TypeScript declarations
- **TypeScript**: Configured with experimental decorators enabled
- **Jest**: Uses ts-jest with ESM support for testing
