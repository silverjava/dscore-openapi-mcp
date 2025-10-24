#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mcp-servers/genapi-patient/src/cli.ts
const index_1 = require("./index");
// Execute the main function
(0, index_1.main)().catch((error) => {
    console.error('Error starting DS Core Open API Patient MCP Server:', error);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map