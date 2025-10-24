"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPServer = void 0;
// mcp-servers/genapi-dcmstudy/src/mcpServer.ts
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
// Simple logging function
function log(...args) {
    console.log('[MCP-LOG]', ...args);
}
class MCPServer {
    constructor(serverName, serverVersion) {
        // Create MCP server instance
        this.mcpServer = new mcp_js_1.McpServer({
            name: serverName || 'genapi-dcmstudy-mcp',
            version: serverVersion || '1.0.0'
        }, {
            capabilities: {}
        });
        // Create transport for handling MCP requests over stdio
        this.transport = new stdio_js_1.StdioServerTransport();
    }
    async start() {
        try {
            log('Connecting transport to MCP server...');
            // Connect transport to server (this automatically starts the transport)
            this.mcpServer.connect(this.transport);
            log('MCP Server started with stdio transport');
        }
        catch (error) {
            log('Error starting MCP Server:', error);
            throw error;
        }
    }
    async stop() {
        try {
            await this.transport.close();
            log('MCP Server stopped');
        }
        catch (error) {
            log('Error stopping MCP Server:', error);
            throw error;
        }
    }
    // Method to register tools with the MCP server
    registerTool(name, description, inputSchema, handler) {
        // Convert the input schema to Zod schema
        const zodSchema = {};
        if (inputSchema && typeof inputSchema === 'object') {
            for (const [key, value] of Object.entries(inputSchema)) {
                // Simple conversion - in practice, you might want more sophisticated mapping
                if (value === 'string') {
                    zodSchema[key] = zod_1.z.string();
                }
                else if (value === 'number') {
                    zodSchema[key] = zod_1.z.number();
                }
                else if (value === 'boolean') {
                    zodSchema[key] = zod_1.z.boolean();
                }
                else {
                    // Default to string for unknown types
                    zodSchema[key] = zod_1.z.string();
                }
            }
        }
        this.mcpServer.tool(name, description, zodSchema, async (args) => {
            const result = await handler(args);
            return {
                content: [
                    {
                        type: 'text',
                        text: typeof result === 'string' ? result : JSON.stringify(result)
                    }
                ]
            };
        });
    }
}
exports.MCPServer = MCPServer;
