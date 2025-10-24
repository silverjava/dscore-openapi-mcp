#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// mcp-servers/genapi-digitalimpression/src/cli.ts
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const index_1 = require("./index");
// Parse command line arguments
(0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .scriptName('genapi-digitalimpression')
    .usage('$0 [args]')
    .help()
    .argv;
// Start the MCP server
(0, index_1.main)().catch(console.error);
