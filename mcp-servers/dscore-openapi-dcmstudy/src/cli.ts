#!/usr/bin/env node
// mcp-servers/genapi-dcmstudy/src/cli.ts
import { main } from './index';

main().catch(error => {
  console.error('Error running GenAPI DICOM Study MCP Server CLI:', error);
  process.exit(1);
});