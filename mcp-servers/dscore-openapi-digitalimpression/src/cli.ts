#!/usr/bin/env node
// mcp-servers/genapi-digitalimpression/src/cli.ts
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { main } from './index';

// Parse command line arguments
yargs(hideBin(process.argv))
  .scriptName('genapi-digitalimpression')
  .usage('$0 [args]')
  .help()
  .argv;

// Start the MCP server
main().catch(console.error);