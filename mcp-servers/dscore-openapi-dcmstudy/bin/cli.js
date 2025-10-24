#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mcp-servers/genapi-dcmstudy/src/cli.ts
const index_1 = require("./index");
(0, index_1.main)().catch(error => {
    console.error('Error running GenAPI DICOM Study MCP Server CLI:', error);
    process.exit(1);
});
