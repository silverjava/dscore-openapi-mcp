# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo containing four Model Context Protocol (MCP) servers for DS Core's Open API platform, enabling AI Large Language Models to interact with healthcare data. Each server provides specialized tools for different healthcare domains.

## Architecture

The monorepo contains four MCP servers in the `mcp-servers/` directory:
- `dscore-openapi-patient` - Patient search and retrieval
- `dscore-openapi-document` - Healthcare document management
- `dscore-openapi-dcmstudy` - DICOM medical imaging studies
- `dscore-openapi-digitalimpression` - Dental scan data management

Each server follows a consistent structure:
```
mcp-servers/dscore-openapi-*/
├── src/
│   ├── index.ts          # Main server entry point
│   ├── cli.ts           # CLI entry point with shebang
│   └── services/        # API service implementations
├── dist/                # Compiled JavaScript output
└── package.json
```

## Common Development Commands

### Build Commands
```bash
# Build all servers
npm run build

# Build individual servers
npm run build:patient
npm run build:document
npm run build:dcmstudy
npm run build:digitalimpression

# Clean build artifacts
npm run clean
```

### Testing and Quality
```bash
# Run all tests
npm run test

# Lint all code
npm run lint
```

### Development
```bash
# Install dependencies
npm install

# Run a specific server in development mode (from server directory)
cd mcp-servers/dscore-openapi-patient
npm run dev
```

## Key Technical Details

- **TypeScript**: All servers are written in TypeScript with strict mode enabled
- **Build System**: Uses TypeScript compiler with CommonJS modules, target ES2020
- **MCP SDK**: Built on `@modelcontextprotocol/sdk` version ^1.20.0
- **Environment Variables**: All servers require `GENAPI_BASE_URL` and `GENAPI_API_KEY`
- **CLI Tools**: Each server provides a CLI tool with shebang for direct execution

## Server-Specific Notes

### Patient Server
- Tools: `search-patient`, `get-patient`
- Dependencies: zod for validation, yargs for CLI

### Document Server
- Tools: `list-documents`, `get-document`
- Dependencies: uuid for ID generation, yargs for CLI
- Build uses individual file compilation approach

### DICOM Study Server
- Tools: `list-dicom-studies`, `get-dicom-study`
- Includes Jest testing setup

### Digital Impression Server
- Tools: `list-digital-impressions`, `get-digital-impression`
- Includes Jest testing setup

## Testing Approach

Servers with Jest configuration have test files in `src/__tests__/` directories. Tests focus on service functionality and API integration.